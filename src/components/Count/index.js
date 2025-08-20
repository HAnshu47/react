import './index.scss';
import { useDispatch } from 'react-redux';
import { addCar, minusCar } from '../../store/modules/takeaway';

const Count = ({ onPlus, onMinus, count, id }) => {
  const dispatch = useDispatch();
  console.log(id, 'id');
  console.log(count, 'count');
  return (
    <div className="goods-count">
      <span className="minus" onClick={() => dispatch(minusCar({ id, count }))}>
        -
      </span>
      <span className="count">{count}</span>
      <span className="plus" onClick={() => dispatch(addCar({ id, count }))}>
        +
      </span>
    </div>
  );
};

export default Count;
