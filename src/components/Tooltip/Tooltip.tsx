import React, { useState, PropsWithChildren, useEffect } from "react";
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
	const [isShown, setIsShown] = useState(false);
	const rootRef = React.useRef(null);
	const tooltipRef = React.useRef(null);

	const handleOutsideClick = (event: MouseEvent) => {
		if (!rootRef.current) {
			window.removeEventListener("click", handleOutsideClick);
			return;
		}

		if (
			!rootRef.current.contains(event.target) &&
			tooltipRef.current &&
			!tooltipRef.current.contains(event.target)
		) {
			setIsShown(false);
		}
	};

	const handleKeyDown = (event: KeyboardEvent) => {
		if (!rootRef.current) {
			window.removeEventListener("keydown", handleKeyDown);
			return;
		}

		if (event.key === "Escape") {
			setIsShown(false);
		}
	};

	useEffect(() => {
		window.addEventListener("click", handleOutsideClick);
		window.addEventListener("keydown", handleKeyDown);
		return () => {
			window.removeEventListener("click", handleOutsideClick);
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, []);

	return (
		<>
			<TooltipContainer
				className="tooltip_button-container"
				ref={rootRef}
				onClick={() => !isShown && setIsShown(true)}
			>
				{element}
			</TooltipContainer>
			{isShown ? (
				<Tooltip
					customProps={customProps}
					ref={tooltipRef}
					rootRef={rootRef}
				>
					{content}
				</Tooltip>
			) : (
				""
			)}
		</>
	);
};

export default withTooltip;
