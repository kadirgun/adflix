import PublisherLayout from "@/layouts/PublisherLayout";
import React, { ReactElement, useEffect, useState } from "react";
import { DataTable } from "mantine-datatable";
import { ActionIcon, Anchor, Button, Grid, Group, Paper, Skeleton, Stack, Text, TextInput, Title, createStyles, rem } from "@mantine/core";
import { IconEdit, IconEye, IconPlus, IconSearch, IconTrash } from "@tabler/icons-react";
import { handleCreateLink } from "@/core/modal";
import { useApi } from "@/hooks";
import { notifications } from "@mantine/notifications";
import Moment from "moment";
import useConfig from "@/hooks/useConfig";
import { Link } from "@/components/types";
import LinkCard from "@/components/publisher/LinkCard";
import { useRouter } from "next/router";

const useStyles = createStyles((theme) => {
	return {
		title: {
			fontFamily: `Greycliff CF, ${theme.fontFamily}`,
		},

		linkAnchor: {
			":hover": {
				textDecoration: "none",
			},
		}
	};
});

const Index = () => {
	const { classes } = useStyles();

	const api = useApi();
	const router = useRouter();

	const [data, setData] = useState<Link[]>([]);
	const [selectedRecords, setSelectedRecords] = useState<any[]>([]);

	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		console.log("rendered")
		api.links
			.list()
			.then((response) => {
				setData(response.data.links);
				setLoading(false);
			})
			.catch((error) => {
				notifications.show({
					title: "Error!",
					message: "Something went wrong, please try again later.",
					color: "red",
				});
			});
	}, [router]);

	return (
		<>
			<Group position="apart" mb="xl">
				<Title order={3} className={classes.title}>
					Monetized Links
				</Title>
				<Button leftIcon={<IconPlus size={rem(15)} />} onClick={handleCreateLink} miw={120}>
					Create New
				</Button>
			</Group>

			<Group position="apart" mb="lg">
				<Group position="left">{loading ? <Skeleton w={250} h={36}></Skeleton> : <TextInput placeholder="Search..." icon={<IconSearch size={16} />} miw={250} />}</Group>

				<Group position="right">
					{selectedRecords.length && (
						<Button color="red" leftIcon={<IconTrash size={rem(15)} />} onClick={handleCreateLink} miw={120}>
							Delete {selectedRecords.length} records
						</Button>
					)}
				</Group>
			</Group>

			{loading ? (
				<Skeleton height={180}></Skeleton>
			) : (
				<Grid>
					{data.map((link) => (
						<Grid.Col xs={12} lg={6} xl={4} key={link.key}>
              <LinkCard value={link} />
            </Grid.Col>
					))}
				</Grid>
			)}
		</>
	);
};

Index.getLayout = (page: ReactElement) => <PublisherLayout>{page}</PublisherLayout>;
export default Index;
