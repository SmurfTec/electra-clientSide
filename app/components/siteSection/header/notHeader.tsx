import { Button, Flex, Group, Text } from '@mantine/core'
import { NextLink } from '@mantine/next'
import React from 'react'
import { Home } from 'tabler-icons-react'

export const NotHeader = () => {
  return (
    <Flex
    mih={60}
    className="bg-black text-white font-normal text-xs md:text-base"
    justify="center"
    align="center"
    direction="row"
    wrap="wrap"
  >
    <Group position="apart" className="w-full px-0 md:px-10">
      <Text component={NextLink} href="/" color="white"  className="font-bold ml-6 md:ml-3 text-xl">
        Elektra
      </Text>
      <Button color="black" component={NextLink} href="/" bg={'black'} leftIcon={<Home />}>
        Go to home
      </Button>
    </Group>
  </Flex>
  )
}
