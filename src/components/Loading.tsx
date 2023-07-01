export const Loading = () => {
	return (
		// By Sam Herbert (@sherb), for everyone. More @ http://goo.gl/7AJzbL
		<div className="flex w-full items-center justify-center pt-16 text-primary">
			<div className="h-20 w-20">
				<svg
					stroke="currentColor"
					viewBox="0 0 57 57"
					xmlns="http://www.w3.org/2000/svg"
				>
					<g fill="none" fillRule="evenodd">
						<g strokeWidth="2" transform="translate(1 1)">
							<circle cx="5" cy="50" r="5">
								<animate
									attributeName="cy"
									begin="0s"
									calcMode="linear"
									dur="2.2s"
									repeatCount="indefinite"
									values="50;5;50;50"
								/>
								<animate
									attributeName="cx"
									begin="0s"
									calcMode="linear"
									dur="2.2s"
									repeatCount="indefinite"
									values="5;27;49;5"
								/>
							</circle>
							<circle cx="27" cy="5" r="5">
								<animate
									attributeName="cy"
									begin="0s"
									calcMode="linear"
									dur="2.2s"
									from="5"
									repeatCount="indefinite"
									to="5"
									values="5;50;50;5"
								/>
								<animate
									attributeName="cx"
									begin="0s"
									calcMode="linear"
									dur="2.2s"
									from="27"
									repeatCount="indefinite"
									to="27"
									values="27;49;5;27"
								/>
							</circle>
							<circle cx="49" cy="50" r="5">
								<animate
									attributeName="cy"
									begin="0s"
									calcMode="linear"
									dur="2.2s"
									repeatCount="indefinite"
									values="50;50;5;50"
								/>
								<animate
									attributeName="cx"
									begin="0s"
									calcMode="linear"
									dur="2.2s"
									from="49"
									repeatCount="indefinite"
									to="49"
									values="49;5;27;49"
								/>
							</circle>
						</g>
					</g>
				</svg>
			</div>
		</div>
	);
};
