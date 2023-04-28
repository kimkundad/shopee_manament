import React from "react";
import {
  Image,
  Checkbox,
  Menu,
  MenuButton,
  MenuList,
  Button,
  MenuItem,
  CheckboxGroup,
} from "@chakra-ui/react";
function index(props) {
  const handleCheckboxChange = (index, isChecked) => {
    props.onChange(index, isChecked);
  };

  return (
    <Menu closeOnSelect={false}>
      <MenuButton
        as={Button}
        bg="white !important"
        fontSize="21px"
        minWidth={"200"}
        leftIcon={<Image src="/images/menu.png" h="25px" w="25px" />}
        rightIcon={
          <Image
            src="/images/arrow/down-filled-triangular-arrow.png"
            h="10px"
            w="20px"
          />
        }
        _hover={{}}
      >
        เลือกตัวแสดงผล
      </MenuButton>

      <MenuList
        minWidth="200px"
        border="1px"
        borderColor="red"
        borderRadius="md"
      >
        <CheckboxGroup>
          {props.data.map((item, index) => {
            return (
              <MenuItem key={index}>
                <Checkbox
                  sx={{
                    ".chakra-checkbox__control": {
                      background: "white !important",
                      borderColor: "black !important",
                      color: "#3FFF33 !important",
                      border: "1px solid",
                    },
                  }}
                  isChecked={props.selected[index]}
                  onChange={(e) =>
                    handleCheckboxChange(index, e.target.checked)
                  }
                >
                  {item.label}
                </Checkbox>
              </MenuItem>
            );
          })}
        </CheckboxGroup>
      </MenuList>
    </Menu>
  );
}

export default index;
