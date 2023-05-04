import { Alert, Box, Stack } from "@mantine/core";
import { IconAlertCircle } from "@tabler/icons-react";
import { IErrorMessageResponse } from "./types";

// Example of usage:
//  <ErrorMessages messages={{email: ['string', 'string2']}}>

interface Props {
	messages: IErrorMessageResponse | undefined;
}

const ErrorMessages = ({ messages }: Props) => {
	if (!messages) {
		return null;
	}

	const strings = Object.keys(messages).map((item) => messages[item])[0];

	return (
		<Alert icon={<IconAlertCircle size="1rem" />} color="red">
			<Stack>
				{Array.isArray(strings) &&
					strings.map((string, index) => {
						return <Box key={index}>{string}</Box>;
					})}
				{!Array.isArray(strings) && <Box>{strings}</Box>}
			</Stack>
		</Alert>
	);
};

export default ErrorMessages;
