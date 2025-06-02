
const GrandChild = () => {
  // let value = useContext(Context1);
  return (
    <div>
      GrandChild
      <p>Name is {value.name}</p>
      <p>Age is {value.age}</p>
      <button onClick={()=>{
        value.setName("Shyam")
      }}>Change Name</button>
    </div>
  );
};

export default GrandChild;
