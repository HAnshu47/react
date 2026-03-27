import { useSelector, useDispatch } from 'react-redux';
import { getChannelList } from '../../store/modules/docs';
import { useEffect } from 'react';

export function useChannel() {
  const dispatch = useDispatch();
  const { channelList } = useSelector((state) => state.docs);
  useEffect(() => {
    dispatch(getChannelList());
  }, [dispatch]);
  return channelList;
}
