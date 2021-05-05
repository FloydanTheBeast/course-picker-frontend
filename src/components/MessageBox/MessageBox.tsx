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
	color: #333;
	display: flex;
	flex-flow: row nowrap;
	align-items: center;
	margin-bottom: 10px;
	border-radius: 8px;
	border: 2px solid;

	&.error {
		&.primary {
			background-color: #e74c3c;
			color: #fff;

			& .icon {
				fill: #fff;
			}
		}

		border-color: #e74c3c;

		& .icon {
			fill: #e74c3c;
		}
	}

	&.success {
		border-color: #2ecc71;

		& .icon {
			fill: #2ecc71;
		}
	}

	& .icon {
		width: 16px;
		height: 16px;
		margin: 0 10px;
	}

	& p {
		margin: 10px 0;
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
			<Icon className="icon" />
			<p>{message}</p>
		</StyledMessageBox>
	);
};

export default MessageBox;
