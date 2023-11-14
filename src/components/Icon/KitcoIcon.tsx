interface Props {
  color?: string;
  width?: string;
}
const KitcoIcon = ({ color, width }: Props) => (
  <div style={{ width: width ? width : "18px" }}>
    <svg
      id="Isolation_Mode"
      x="0px"
      y="0px"
      viewBox="0 0 80 90"
      fill={color ? color : "black"}
    >
      <path d="M33.4,36.4l21.4,0L72.2,7.2H12.4l-5.1,5.5c0,0,9.6,1.4,17.5,7.6C30.6,25.3,33,29.6,33.4,36.4" />
      <rect x="33.4" y="39.2" width="21" height="42.1" />
      <polygon points="57.2,38.1 57.2,78.9 74.6,51.5 74.6,8.7 " />
      <path
        d="M30.7,36.5c-0.3-3.6-1.2-8.6-6.9-13.4c-7-6.2-16.9-7.8-17.7-7.9v41.4v0.1c0,0,6.9,1,13.9,4.4c8.7,4.2,10.6,10.1,10.8,10.8
   V36.5z"
      />
    </svg>
  </div>
);

export default KitcoIcon;
