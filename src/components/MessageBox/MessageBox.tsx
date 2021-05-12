import ErrorIcon from "icons/error.svg";
import SuccessIcon from "icons/success.svg";
import React from "react";
import styled from "styled-components";

enum MessageBoxTypes {
	"error",
	"success"
}

interface MessageBoxProps {
	type: keyof typeof MessageBoxTypes;
	message: string;
	closable?: boolean;
	closeTimeout?: number;
	onClose?: () => void;
	primary?: boolean;
}

const StyledMessageBox = styled.div`
	display: flex;
	flex-flow: row nowrap;
	align-items: stretch;
	color: #333;
	margin-bottom: 10px;
	border-radius: 8px;
	overflow: hidden;
	box-shadow: 2px 2px 6px 1px rgb(0 0 0 / 25%);

	& .icon-container {
		display: flex;
		align-items: center;
		margin-right: 12px;
	}

	&.primary {
		& h3 {
			color: #fff;
		}

		& p {
			color: #eee;
		}
	}

	&.error {
		& .icon-container {
			background-color: #e74c3c;
		}

		&.primary {
			background-color: #e74c3c;
		}
	}

	&.success {
		& .icon-container {
			background-color: #2ecc71;
		}
	}

	& .icon {
		width: 16px;
		height: 16px;
		fill: rgba(255, 255, 255, 0.8);
		margin: 0 10px;
		border: 1px solid rgba(255, 255, 255, 0.8);
		padding: 4px;
		border-radius: 50%;
	}

	& h3 {
		margin: 8px 0 0 0;
	}

	& p {
		margin: 0 0 8px 0;
		color: #888;
		font-size: 14px;
	}
`;

const MessageBox: React.FC<MessageBoxProps> = ({
	type,
	message,
	closable,
	closeTimeout,
	onClose,
	primary
}: MessageBoxProps) => {
	let Icon;

	switch (type) {
		case "error":
			Icon = ErrorIcon;
			break;
		case "success":
			Icon = SuccessIcon;
			break;
	}

	if (closable && typeof onClose === "function") {
		setTimeout(onClose, closeTimeout || 2000);
	}

	return (
		<StyledMessageBox className={`${type} ${primary ? "primary" : ""}`}>
			<div className="icon-container">
				<Icon className="icon" />
			</div>
			<div>
				<h3>{type === "error" ? "Ошибка" : "Успех"}</h3>
				<p>{message}</p>
			</div>
		</StyledMessageBox>
	);
};

export default MessageBox;
