type Props = {
    color?: string;
    gradient?: string;
    width?: number | string;
    height?: number | string;
};

export function IconFolder({
    width = 100,
    color = "#FFC531",
    gradient = "#FCF68D",
}: Props) {
    return (
        <svg
            width={width}
            viewBox="0 0 55 45"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <g clipPath="url(#clip0_1_5)">
                <path
                    d="M0 3.09279V41.9642C0 43.6255 1.28923 44.9724 2.87958 44.9724H52.1204C53.7107 44.9724 55 43.6255 55 41.9642V9.22745C55 7.56607 53.7107 6.21927 52.1204 6.21927H26.2757C25.1563 6.21927 24.1423 5.53669 23.5567 4.53997C22.4895 2.7237 20.5653 0.0846024 18.3933 0.0846024H2.87508C1.28473 0.0846024 0 1.43141 0 3.09279Z"
                    fill={color}
                />
                <path
                    d="M1 20H24V8H3.3C2.02925 8 1 8.76714 1 9.71429V20Z"
                    fill="white"
                />
                <path
                    d="M55 10.3871V40.9543C55 42.6156 53.7107 43.9624 52.1204 43.9624H2.87958C1.28923 43.9624 0 42.6156 0 40.9543V14.5C0 12.8387 0.909651 12 2.5 12H17C21.8953 12 21.6328 7.37871 24.9803 7.37887C34.1136 7.37931 46.5723 7.37908 52.1253 7.37895C53.7157 7.37891 55 8.72574 55 10.3871Z"
                    fill="url(#paint0_linear_1_5)"
                />
            </g>
            <defs>
                <linearGradient
                    id="paint0_linear_1_5"
                    x1="55"
                    y1="7.37887"
                    x2="-0.274506"
                    y2="43.5428"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop offset="0.234375" stopColor={gradient} />
                    <stop offset="1" stopColor={color} />
                </linearGradient>
                <clipPath id="clip0_1_5">
                    <rect width="55" height="45" fill="white" />
                </clipPath>
            </defs>
        </svg>
    );
}
