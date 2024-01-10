import { Box, Button, IconButton, Modal } from "@mui/material";
import { useGetItemsQuery } from "../../services/apis/awardsApisSlice";
import styles from "./awardsList.module.css";
import NomineeCard from "../nomineeCard";
import { Fragment, useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch } from "react-redux";
import { setItems } from "../../features/items/itemsSlice";

interface Category {
  id: number;
  category: string;
  nominees: {
    id: number;
    name: string;
    image: string;
  }[];
}

export type selectedItemsType = {
  itemID: number;
  categoryID: number;
}[];

const AwardsList = () => {
  const { data, isLoading } = useGetItemsQuery({});

  const [selectedItems, setSelectedItems] = useState<selectedItemsType>([]);

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
    console.log(selectedItems);
  };
  const handleClose = () => setOpen(false);

  const getItem = (CategoryId: number, itemId: number) => {
    return data
      ?.find((item) => item.id === CategoryId)
      ?.nominees.find((item) => item.id === itemId);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setItems({ items: data }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);
  if (isLoading) return <></>;

  return (
    <Box className={`container ${styles.wrapper}`}>
      {data?.map((category: Category) => (
        <Box key={category.id}>
          <Box className={styles.category}>{category.category}</Box>
          <Box className={styles.nominees}>
            {category.nominees?.map((nominee) => (
              <Fragment key={nominee?.id}>
                <NomineeCard
                  {...nominee}
                  categoryID={category.id}
                  selectedItems={selectedItems}
                  setSelectedItems={setSelectedItems}
                />
              </Fragment>
            ))}
          </Box>
        </Box>
      ))}
      <Button
        className={styles.submitBtn}
        variant="contained"
        onClick={handleOpen}
      >
        Submit Ballot Button
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box className={styles.modalWrapper}>
          <Box className={styles.modal}>
            <IconButton className={styles.close} onClick={handleClose}>
              <CloseIcon />
            </IconButton>
            <Box className={styles.content}>
              <h2>Success</h2>
              {selectedItems.map(({ categoryID, itemID }) => (
                <Box>
                  <h2>id: {getItem(categoryID, itemID)?.id}</h2>
                  <h2>name: {getItem(categoryID, itemID)?.name}</h2>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};
export default AwardsList;
