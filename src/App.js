import React from "react"

import { Layout, Dropdown, Menu, Button } from "antd"
import { UserOutlined } from "@ant-design/icons"

import LoginPage from "./components/LoginPage"
import HostHomePage from "./components/HostHomePage";
import GuestHomePage from "./components/GuestHomePage";


const { Header, Content } = Layout

class App extends React.Component {
	state = {
		authed: false,
		asHost: false,
	}

	componentDidMount() {
		// LocalStorage: https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
		const authToken = localStorage.getItem("authToken")
		const asHost = localStorage.getItem("asHost") === "true"
		this.setState({
			authed: authToken !== null,
			asHost,
		})
	}

	handleLoginSuccess = (token, asHost) => {
		// Local storage is NOT how they do it in the industry
		// The best way is to store it in http cookie
		// But since there's no way to deploy front and backend separatly for free using cookie
		// we use local storage in this project
		// Local storage is just a hash map. It will be there after browser is closed
		localStorage.setItem("authToken", token)
		localStorage.setItem("asHost", asHost)
		this.setState({
			authed: true,
			asHost,
		})
	}

	handleLogOut = () => {
		localStorage.removeItem("authToken")
		localStorage.removeItem("asHost")
		this.setState({
			authed: false,
		})
	}

	renderContent = () => {
		if (!this.state.authed) {
			return <LoginPage handleLoginSuccess={this.handleLoginSuccess} />
		}

		if (this.state.asHost) {
			return <HostHomePage />;
		}

		return <GuestHomePage />
	}

	userMenu = (
		<Menu>
			<Menu.Item key="logout" onClick={this.handleLogOut}>
				Log Out
			</Menu.Item>
		</Menu>
	)

	render() {
		return (
			<Layout style={{ height: "100vh" }}>
				<Header style={{ display: "flex", justifyContent: "space-between" }}>
					<div style={{ fontSize: 16, fontWeight: 600, color: "white" }}>
						StayBooking
					</div>
					{this.state.authed && (
						<div>
							<Dropdown trigger="click" overlay={this.userMenu}>
								<Button icon={<UserOutlined />} shape="circle" />
							</Dropdown>
						</div>
					)}
				</Header>
				{/* note: here the 64px is the header space.*/}
				{/* It is a constant and most websites has header height fixed, unaffected by zoom in and outs */}
				<Content
					style={{ height: "calc(100% - 64px)", margin: 20, overflow: "auto" }}
				>
					{this.renderContent()}
				</Content>
			</Layout>
		)
	}
}


export default App
