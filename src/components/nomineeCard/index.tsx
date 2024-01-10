import { Box, Button } from "@mui/material";
import { Dispatch, FunctionComponent, SetStateAction, useState } from "react";
import styles from "./NomineeCard.module.css";
import { selectedItemsType } from "../awardsList";
import { toast } from "react-toastify";

interface NomineeCardProps {
  id: number;
  categoryID: number;
  image: string;
  name: string;
  setSelectedItems: Dispatch<SetStateAction<selectedItemsType>>;
  selectedItems: selectedItemsType;
}

const NomineeCard: FunctionComponent<NomineeCardProps> = ({
  id,
  name,
  image,
  categoryID,
  selectedItems,
  setSelectedItems,
}) => {
  const [isSelected, setIsSelected] = useState(
    selectedItems?.includes({
      itemID: id,
      categoryID: categoryID,
    })
  );
  const handelSelectItem = () => {
    const isSameCategory = selectedItems.filter(
      (item) => item.categoryID === categoryID
    )?.length;

    const isSameField =
      selectedItems.find((item) => item.categoryID === categoryID)?.itemID ===
      id;

    if (!isSameField && !isSameCategory) {
      setSelectedItems([
        ...selectedItems,
        { itemID: id, categoryID: categoryID },
      ]);
    }

    if (isSameCategory && !isSameField) {
      toast.error("you can't select two items from same category");
      return;
    }

    if (isSameField) {
      setSelectedItems(
        selectedItems.filter(
          (item) => item.categoryID !== categoryID && item.itemID !== id
        )
      );
    }
    setIsSelected(!isSelected);
  };

  return (
    <Box className={`${styles.holder} ${isSelected ? styles.selected : ""}`}>
      <h2>{name}</h2>
      <Box className={styles.image}>{image}</Box>
      <Button
        className={styles.btn}
        variant="contained"
        onClick={handelSelectItem}
      >
        {isSelected ? "unselect" : "select"}
      </Button>
    </Box>
  );
};
export default NomineeCard;
