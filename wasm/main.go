package main

import (
	"bytes"
	"crypto/aes"
	"crypto/cipher"
	"crypto/hmac"
	"crypto/rand"
	"crypto/sha256"
	"encoding/base64"
	"encoding/hex"
	"net/url"
	"syscall/js"
)

var key []byte

func main() {
	c := make(chan struct{})
	key, _ = base64.StdEncoding.DecodeString("YUZwUjJWV2d2WjgyTkwySQ==")

	js.Global().Set("encrypt", Encrypt())

	<-c
}

type Encrypted struct {
	value string
	iv    string
	mac   string
}

func Encrypt() js.Func {
	return js.FuncOf(func(this js.Value, args []js.Value) interface{} {
		if !validateDomain() {
			return js.ValueOf(map[string]interface{}{
				"error": "invalid domain",
			})
		}

		content := make([]byte, args[0].Get("length").Int())
		js.CopyBytesToGo(content, args[0])

		hexIV, _ := randomHex(aes.BlockSize / 2)
		iv := []byte(hexIV)

		padding := (aes.BlockSize - len(content)%aes.BlockSize)
		padtext := bytes.Repeat([]byte{byte(padding)}, padding)
		content = append(content, padtext...)

		block, _ := aes.NewCipher(key)

		ciphertext := make([]byte, len(content))
		mode := cipher.NewCBCEncrypter(block, iv)
		mode.CryptBlocks(ciphertext, content)

		response := Encrypted{
			value: base64.StdEncoding.EncodeToString(ciphertext),
			iv:    base64.StdEncoding.EncodeToString(iv),
		}

		mac := hmac.New(sha256.New, key)
		mac.Write([]byte(response.iv + response.value))
		response.mac = hex.EncodeToString(mac.Sum(nil))

		return js.ValueOf(map[string]interface{}{
			"value": response.value,
			"iv":    response.iv,
			"mac":   response.mac,
		})
	})
}

func validateDomain() bool {
	location := js.Global().Get("location").Get("href").String()
	url, err := url.Parse(location)
	if err != nil {
		return false
	}

	hostHash := js.Global().Get("host").String()
	mac := hmac.New(sha256.New, key)
	mac.Write([]byte(url.Hostname()))
	expectedMac := hex.EncodeToString(mac.Sum(nil))

	return hostHash == expectedMac
}

func randomHex(n int) (string, error) {
	bytes := make([]byte, n)
	if _, err := rand.Read(bytes); err != nil {
		return "", err
	}
	return hex.EncodeToString(bytes), nil
}
