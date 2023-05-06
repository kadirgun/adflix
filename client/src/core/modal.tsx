import { modals } from "@mantine/modals";

export const handleCreateLink = () => {
	modals.openContextModal({
		modal: "createLink",
		title: "Create Monetized Short Link",
		styles: {
			title: {
				fontWeight: 600,
			},
		},
		innerProps: {},
		size: "md",
		centered: true,
		withCloseButton: false,
		closeOnClickOutside: false,
		closeOnEscape: false,
	});
};
