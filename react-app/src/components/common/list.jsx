const ListGroup = ({ items, onItemSelect, selectedItem }) => {
  return (
    <ul className='list-group'>
      {items.map((item) => (
        <li
          key={item._id}
          className={
            item === selectedItem ? "list-group-item active" : "list-group-item"
          }
          onClick={() => onItemSelect(item)}
        >
          {item.name}
        </li>
      ))}
    </ul>
  );
};

// ListGroup.defaultProps = {
//   textProperty: "name",
//   valueProperty: "_id",
// };

export default ListGroup;
