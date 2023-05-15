import { ILinkCardProps } from "@/components/types";
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


export const handleEditLink = ({ value }: ILinkCardProps) => {
	modals.openContextModal({
		modal: "editLink",
		title: "Edit Short Link",
		styles: {
			title: {
				fontWeight: 600,
			},
		},
		innerProps: value,
		size: "md",
		centered: true,
		withCloseButton: false,
		closeOnClickOutside: false,
		closeOnEscape: false,
	});
};
