import React, { PropsWithChildren } from "react";
import styled from "styled-components";

interface TooltipCustomProps {
	offsetTop?: number;
}

interface StyledTooltipProps {
	ref: any;
	top?: number;
	right?: number;
}

interface TooltipProps {
	rootRef: React.MutableRefObject<HTMLElement>;
	customProps?: TooltipCustomProps;
}

const TooltipContainer = styled.div`
	height: 100%;
	display: flex;
	align-items: center;
`;

const StyledTooltip = styled.div<StyledTooltipProps>`
	text-transform: initial;
	position: absolute;
	top: ${(props) => props.top}px;
	right: ${(props) => props.right}px;
	width: 150px;
	background: #fff;
	border: 1px solid #eee;
	box-shadow: 4px 4px 8px 0px rgba(34, 60, 80, 0.2);
	z-index: 1;
`;

const Tooltip = React.forwardRef(
	(
		{
			children,
			customProps,
			rootRef
		}: TooltipProps & PropsWithChildren<React.ReactNode>,
		ref
	) => {
		const root = rootRef.current;
		const { x, width, y, height } = root.getBoundingClientRect();

		const { offsetTop = 0 } = customProps || {};

		return (
			<StyledTooltip
				ref={ref}
				top={Math.ceil(y + height + offsetTop)}
				right={Math.ceil(window.innerWidth - x - width)}
			>
				{children}
			</StyledTooltip>
		);
	}
);
Tooltip.displayName = "Tooltip";

const withTooltip = (
	element: React.ReactNode,
	content: React.ReactNode | React.ReactNode[],
	customProps?: TooltipCustomProps
) => {
	return class Tooltiped extends React.Component<any, { isShown: boolean }> {
		rootRef: React.RefObject<any>;
		tooltipRef: React.RefObject<any>;

		constructor(props: any) {
			super(props);

			this.state = {
				isShown: false
			};

			this.rootRef = React.createRef();
			this.tooltipRef = React.createRef();

			this.handleOutsideClick = this.handleOutsideClick.bind(this);
			this.handleKeyDown = this.handleKeyDown.bind(this);
			this.handleScroll = this.handleScroll.bind(this);

			window.addEventListener("click", this.handleOutsideClick);
			window.addEventListener("keydown", this.handleKeyDown);
			window.addEventListener("scroll", this.handleScroll);
		}

		componentWillUnmount() {
			window.removeEventListener("click", this.handleOutsideClick);
			window.removeEventListener("keydown", this.handleKeyDown);
			window.removeEventListener("scroll", this.handleScroll);
		}

		handleOutsideClick(event: MouseEvent) {
			if (!this.rootRef.current) {
				window.removeEventListener("click", this.handleOutsideClick);
				return;
			}

			if (
				!this.rootRef.current.contains(event.target) &&
				this.tooltipRef.current &&
				!this.tooltipRef.current.contains(event.target)
			) {
				this.setState({ isShown: false });
			}
		}

		handleKeyDown(event: KeyboardEvent) {
			if (!this.rootRef.current) {
				window.removeEventListener("keydown", this.handleKeyDown);
				return;
			}

			if (event.key === "Escape") {
				this.setState({ isShown: false });
			}
		}

		handleScroll() {
			if (!this.rootRef.current) {
				window.removeEventListener("keydown", this.handleScroll);
				return;
			}

			this.setState({ isShown: false });
		}

		render() {
			return (
				<>
					<TooltipContainer
						className="tooltip_button-container"
						ref={this.rootRef}
						onClick={() =>
							!this.state.isShown &&
							this.setState({ isShown: true })
						}
					>
						{element}
					</TooltipContainer>
					{this.state.isShown ? (
						<Tooltip
							customProps={customProps}
							ref={this.tooltipRef}
							rootRef={this.rootRef}
						>
							{content}
						</Tooltip>
					) : (
						""
					)}
				</>
			);
		}
	};
};

export default withTooltip;
