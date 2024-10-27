import * as React from "react";

interface StarRateFilledIconProps extends React.SVGProps<SVGSVGElement> {
  color?: string;
}

const StarRateFilledIcon = ({
  color = "#5f6368",
  ...props
}: StarRateFilledIconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="1em"
    height="1em"
    fill={color}
    {...props}
  >
    <path
      id="Capa_1"
      d="m8.9 16.8 3.1-1.9 3.2 1.9-.8-3.6 2.8-2.4-3.7-.3L12 7.1l-1.4 3.4-3.7.3 2.8 2.4-.8 3.6zm3.1.5-4.2 2.5c-.2.1-.4.2-.6.1-.2 0-.4-.1-.5-.2s-.3-.3-.3-.4c-.1-.2-.1-.4-.1-.6L7.5 14l-3.7-3.2c-.2-.2-.3-.3-.3-.5v-.6c.1-.2.2-.3.3-.4.1-.1.3-.2.5-.2l4.8-.4L11 4.2c.1-.2.2-.3.4-.5.2-.1.4-.1.5-.1s.4 0 .5.1c.2.1.3.3.4.5l1.9 4.5 4.8.4c.2 0 .4.1.6.2.1.1.2.3.3.4.1.2.1.4 0 .6 0 .2-.1.4-.3.5L16.6 14l1.1 4.7c.1.2 0 .4 0 .6-.1.2-.2.3-.4.4s-.3.2-.5.2-.4 0-.6-.1L12 17.3z"
    />
    <path
      id="Capa_2"
      d="M12 6.6C9.9 9.7 8.4 9.7 8.4 9.7l-2 .4s.5 1.4.7 1.6c.1.2 1.7 1.9 1.8 2.1 0 .2-.2 1.6-.3 1.8s-.9.9-.8 1.2 3.2-.2 3.3-.2c.1 0 1.1-.8 1.6-.6.5.2 1.8.9 2 1 .2.1 1.1.2 1.2.1V15c0-.3-.1-1.6 0-1.7.2-.1 1.2-.9 1.2-1s1.4-2.1 1.4-2.1l-4.3-.6-2.2-3z"
    />
  </svg>
);

export default StarRateFilledIcon;
