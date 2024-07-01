interface ContainerProps {
  children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({
  children
}) => {
  return ( 
    <div className="mx-auto max-h-max">
      {children}
    </div>
   );
};

export default Container;