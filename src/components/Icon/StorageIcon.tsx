interface Props {
  color?: string;
  width?: string;
}

const StorageIcon = ({ color, width }: Props) => (
  <div style={{ width: width ? width : "18px" }}>
    <svg
      id="Isolation_Mode"
      x="0px"
      y="0px"
      viewBox="0 0 512 512"
      fill={color ? color : "black"}
    >
      <path
        d="M492,0H20C9,0,0,9,0,20v432c0,11,9,20,20,20h60v20c0,11,9,20,20,20s20-9,20-20v-20h272v20c0,11,9,20,20,20s20-9,20-20v-20
	h60c11,0,20-9,20-20V20C512,9,503,0,492,0z M40,201.3h40v69.3H40V201.3z M472,432H40V310.7h40V372c0,11,9,20,20,20h312
	c11,0,20-9,20-20V100c0-11-9-20-20-20H100c-11,0-20,9-20,20v61.3H40V40h432V432z M120,352V120h272v232H120z M256,176
	c-33.1,0-60,26.9-60,60s26.9,60,60,60s60-26.9,60-60S289.1,176,256,176z M256,256c-11,0-20-9-20-20s9-20,20-20c11,0,20,9,20,20
	S267,256,256,256z"
      />
    </svg>
  </div>
);

export default StorageIcon;
