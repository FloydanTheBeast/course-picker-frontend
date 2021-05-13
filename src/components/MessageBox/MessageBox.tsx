import ErrorIcon from "icons/error.svg";
import SuccessIcon from "icons/success.svg";
import React from "react";
import ReactDOM from "react-dom";
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
	absolute?: boolean;
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

	&.absolute {
		position: absolute;
		right: 20px;
		bottom: 20px;
		background-color: #fff;
		animation: messagebox-appear 0.5s ease-out 1;

		& .message {
			margin-right: 10px;
		}

		@keyframes messagebox-appear {
			from {
				right: -100px;
			}

			to {
				right: 20px;
			}
		}
	}

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
	primary,
	absolute
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

	const Element = (
		<StyledMessageBox
			className={`${type} ${primary ? "primary" : ""} ${
				absolute ? "absolute" : ""
			}`}
		>
			<div className="icon-container">
				<Icon className="icon" />
			</div>
			<div className="message">
				<h3>{type === "error" ? "Ошибка" : "Успех"}</h3>
				<p>{message}</p>
			</div>
		</StyledMessageBox>
	);

	return absolute ? ReactDOM.createPortal(Element, document.body) : Element;
};

export default MessageBox;
