interface ColProps extends React.HTMLAttributes<HTMLDivElement> {}

const Col = ({ ...props }: ColProps) => {
  return <div {...props} />;
};

export { Col };
