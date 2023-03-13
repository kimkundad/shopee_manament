import React, { useState, useEffect } from "react";
import { Box, Switch, Text } from "@chakra-ui/react";

import { Table } from "@nextui-org/react"; // icons
export default function stock() {
  const products = [
    {
      id: "sadasld",
      image: "dfjhafja",
      name: "dfjshsd",
      quantity: 100,
      cost: 120,
      price: 100,
      created_date: "15/10/2555",
      maker: "asdsa",
    },
    {
      id: "sadasld",
      image: "dfjhafja",
      name: "dfjshsd",
      quantity: 100,
      cost: 120,
      price: 100,
      created_date: "15/10/2555",
      maker: "asdsa",
    },
    {
      id: "sadasld",
      image: "dfjhafja",
      name: "dfjshsd",
      quantity: 100,
      cost: 120,
      price: 100,
      created_date: "15/10/2555",
      maker: "asdsa",
    },
  ];
  const colunm = [
    {
      label: "เปิด/ปิด",
    },
    {
      label: "รหัสสินค้า",
    },
    {
      label: "รูปสินค้า",
    },
    {
      label: "ชื่อสินค้า",
    },
    {
      label: "สต๊อกสินค้า",
    },
    {
      label: "ต้นทุน",
    },
    {
      label: "ราคา",
    },
    {
      label: "วันที่สร้าง",
    },
    {
      label: "ผู้สร้าง",
    },
    {
      label: "เพิ่มเติม",
    },
  ];

  const [isCheckedAll, setIsCheckedAll] = useState(false);
  const [isCheckedOne, setIsCheckedOne] = useState(
    Array(products.length).fill(false)
  );

  function handleAllSwitchChange() {
    setIsCheckedAll(!isCheckedAll);
    const myArr = Array(products.length).fill(!isCheckedAll);
    setIsCheckedOne(myArr);
  }

  const handleOneSwitchChange = (id) => {
    const newItem = [...isCheckedOne];
    newItem[id] = event.target.checked;
    const allTrue = newItem.every((value) => value === true);
    setIsCheckedOne(newItem);
    if (allTrue) {
      setIsCheckedAll(true);
    } else {
      setIsCheckedAll(false);
    }
  };

  return (
    <>
      <Table
        striped
        sticked
        aria-label="Example table with static content"
        css={{
          height: "auto",
          minWidth: "100%",
          border: "0px",
        }}
      >
        <Table.Header bg="red">
          {colunm.map((item, index) => {
            return (
              <Table.Column
                style={{ backgroundColor: "red", color: "white" }}
                key={index}
                onClick={(event) => handleAllSwitchChange()}
              >
                <Text>{item.label}</Text>

                {index == 0 ? (
                  <Switch colorScheme="green" isChecked={isCheckedAll} />
                ) : null}
              </Table.Column>
            );
          })}
        </Table.Header>
        <Table.Body>
          {products.map((item, index) => {
            return (
              <Table.Row key={index}>
                <Table.Cell>
                  <Switch
                    colorScheme="green"
                    isChecked={isCheckedOne[index]}
                    onChange={(event) => handleOneSwitchChange(index)}
                  />
                </Table.Cell>
                <Table.Cell>{item.id}</Table.Cell>
                <Table.Cell>{item.image}</Table.Cell>
                <Table.Cell>{item.name}</Table.Cell>
                <Table.Cell>{item.quantity}</Table.Cell>
                <Table.Cell>{item.cost}</Table.Cell>
                <Table.Cell>{item.price}</Table.Cell>
                <Table.Cell>{item.created_date}</Table.Cell>
                <Table.Cell>{item.maker}</Table.Cell>
                <Table.Cell>a</Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </>
  );
}
