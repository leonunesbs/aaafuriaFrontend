import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Image, Text, Box, Flex, Menu, MenuButton, MenuList, MenuGroup, MenuItem, MenuDivider, Button, Icon } from '@chakra-ui/core';

import { isAuthenticated, logout } from '../services/auth';
import { useRouter } from 'next/router';

import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineShopping } from "react-icons/ai";

const Header: React.FC = () => {
    const router = useRouter()

    const [isAuth, setIsAuth] = useState(null)

    useEffect(() => {
        async function auth() {
            if (isAuthenticated()) {
                return setIsAuth(true)
            } else {
                return setIsAuth(false)
            }
        }
        auth()
    }, [])


    return (
        <Flex
            backgroundColor='green.600'
            alignItems='center'
            justifyContent='space-around'
            p={2}
            h={24}
            w='100%'
        >
            <Flex flexDir='column' w='20%' maxW='130px'>
                <Button
                    variant='outline'
                    borderColor='#fff'
                    _hover={{ backgroundColor: 'green.300' }}
                    borderRadius='sm'
                    color='green.300'
                    minW='30px'
                    onClick={() => router.push('#')}
                >
                    <Text
                        color='#fff'
                        fontWeight={['thin', 'normal', 'bold']}
                        fontSize={['xs', 'sm', 'lg']}
                    >
                        Seja Sócio
                            </Text>
                </Button>
                <Button
                    variant='outline'
                    borderColor=''
                    backgroundColor='green.600'
                    _hover={{ backgroundColor: 'green.700' }}
                    borderRadius='sm'
                    color='green.300'
                    minW='30px'
                    mt={1}
                    onClick={() => router.push('/loja')}

                >
                    <Text
                        d='f'
                        flexDir='row'
                        color='green.300'
                        fontWeight={['thin', 'normal', 'bold']}
                        fontSize={['xs', 'sm', 'lg']}
                        alignItems='center'
                    >
                        <Box as={AiOutlineShopping} />
                        Loja
                        </Text>
                </Button>
            </Flex>

            <Flex minW='150px' w='80%' justifyContent='center'>
                        <Image
                            alt='logo_branco'
                            src='logo_dark.png'
                            alignSelf='center'
                            p={6}
                        />
            </Flex>

            <Flex maxW='20%'>
                <Menu >
                    <MenuButton
                        as={Button}
                        p={0}
                        backgroundColor='(0,0,0,0)'
                        borderRadius='sm'
                        borderColor='green.300'
                        borderWidth={1}
                        _hover={{ backgroundColor: 'green.700' }}
                    >

                        <Box as={GiHamburgerMenu} size={5} m={0} p={0} color='green.300' />
                    </MenuButton>
                    <MenuList>
                        <MenuGroup title="Profile">
                            <Link href='/carrinho'>
                                <a>
                                    <MenuItem>Carrinho</MenuItem>
                                </a>
                            </Link>
                            <MenuItem>My Account</MenuItem>
                            <MenuItem>Payments </MenuItem>
                        </MenuGroup>
                        <MenuDivider />
                        <MenuGroup title="Conta">
                            {isAuth ?
                                <>
                                <MenuItem>Perfil</MenuItem>
                                <MenuItem onClick={() => (logout(), router.reload())}>Sair</MenuItem>
                                </>
                                :
                                <>
                                <Link href='/login'><a><MenuItem>Login</MenuItem></a></Link>
                                <Link href='/cadastro'>
                                    <a>
                                        <MenuItem>Cadastro</MenuItem>
                                    </a>
                                </Link>
                                </>
                            }
                        </MenuGroup>
                    </MenuList>
                </Menu>
            </Flex>

        </Flex>
    );
}

export default Header;