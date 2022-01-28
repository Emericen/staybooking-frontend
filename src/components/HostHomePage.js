import {
	message,
	Tabs,
	List,
	Card,
	Image,
	Carousel,
	Button,
	Tooltip,
	Space,
	Modal,
} from "antd";
import {
	LeftCircleFilled,
	RightCircleFilled,
	InfoCircleOutlined,
} from "@ant-design/icons";
import Text from "antd/lib/typography/Text";
import React from "react";
import { getStaysByHost } from "../utils";
const { TabPane } = Tabs;

class HostHomePage extends React.Component {
	render() {
		return (
			<Tabs defaultActiveKey="1" destroyInactiveTabPane={true}>
				<TabPane tab="My Stays" key="1">
					<MyStays />
				</TabPane>
				<TabPane tab="Upload Stay" key="2">
					<div>Upload Stays</div>
				</TabPane>
			</Tabs>
		);
	}
}


export class StayDetailInfoButton extends React.Component {
	render() {
		return <></>
	}

}

class MyStays extends React.Component {
	state = {
		loading: false,
		data: [],
	};

	componentDidMount() {
		this.loadData();
	}


	// List flutter, you can only use await when you declare async
	loadData = async () => {
		this.setState({
			loading: true,
		});

		try {
			const resp = await getStaysByHost();
			this.setState({
				data: resp,
			});
		} catch (error) {
			message.error(error.message);
		} finally {
			this.setState({
				loading: false,
			});
		}
	};

	render() {
		return (
			<List
				loading={this.state.loading}
				grid={{
					gutter: 16,
					xs: 1,
					sm: 3,
					md: 3,
					lg: 3,
					xl: 4,
					xxl: 4,
				}}
				dataSource={this.state.data}
				renderItem={(item) => (
					<List.Item>
						<Card
							key={item.id}
							title={
								<div style={{ display: "flex", alignItems: "center" }}>
									<Text ellipsis={true} style={{ maxWidth: 150 }}>
										{item.name}
									</Text>
									<StayDetailInfoButton stay={item} />
								</div>
							}
							actions={[]}
							extra={null}
						>
							{
								<Carousel
									dots={false}
									arrows={true}
									prevArrow={<LeftCircleFilled />}
									nextArrow={<RightCircleFilled />}
								>
									{item.images.map((image, index) => (
										<div key={index}>
											<Image src={image.url} width="100%" />
										</div>
									))}
								</Carousel>
							}
						</Card>
					</List.Item>
				)}
			/>
		);
	}
}


export default HostHomePage;