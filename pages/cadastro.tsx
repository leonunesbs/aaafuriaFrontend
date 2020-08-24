import Link from 'next/link'
import { Heading, Flex, Button, FormControl, FormLabel, Input, FormHelperText, Box, InputGroup, InputRightElement, } from "@chakra-ui/core"
import Header from '../components/Header';

import { useState, useEffect } from 'react';
import api from '../services/api';
import { useRouter } from 'next/router';


interface Item {
    carrinho: any;
}

interface Sócio {
    nome_completo: string;
    matricula: any;
    email: string;
    turma: number;
    data_de_nascimento: string;
    is_socio: boolean;
    foto: string;
    periodo: string;
}


const Carrinho: React.FC = () => {
    const router = useRouter()

    const [birth, setBirth] = useState('')
    const handleBirth = (event: any) => setBirth(event.target.value)

    const [nome, setNome] = useState('')
    const handleNome = (event: any) => setNome((event.target.value).toUpperCase())

    const [email, setEmail] = useState('')
    const handleEmail = (event: any) => setEmail(event.target.value)

    const [matricula, setMatricula] = useState('')
    const handleMatricula = (event: any) => setMatricula(event.target.value)

    const [turma, setTurma] = useState('')
    const handleTurma = (event: any) => setTurma(event.target.value)

    const [senha, setSenha] = useState('')
    const handleSenha = (event: any) => setSenha(event.target.value)

    const [senhaAgain, setSenhaAgain] = useState('')
    const handleSenhaAgain = (event: any) => setSenhaAgain(event.target.value)

    const [loading, setLoading] = useState(false)

    const [digitando, setDigitando] = useState(true)


    
    
    // useEffect(() => {
    //     if (birth.match(/^\d{2}$/) != null) {
    //         setBirth(birth + '/')
    //     } else if (birth.match(/^\d{2}\/\d{2}$/) != null) {
    //         setBirth(birth + '/')
    //     }
    // }, [birth])
    
    useEffect(() => {
        if (matricula.length == 8) 
            setDigitando(false)
        else 
            setDigitando(true)

    }, [matricula])
    
    const handleLoadData = async () => {
        setLoading(true)
        const response: any = await api.get(`https://aaafuria.herokuapp.com/api/get-socio-data/${matricula}`)
        if (response.data) {
            setNome(response.data.nome_completo.toUpperCase())
            setEmail(response.data.email)
            setTurma(response.data.turma)
            setBirth(response.data.data_de_nascimento)
        }
        setLoading(false)
    }

    return (
        <Flex flexDir='column'>
            <Header />
            <Flex flexDirection='column'>
                <Heading textAlign='center' mt={16} size={'xl'} color='green.600'>Cadastro</Heading>
            </Flex>
            <Flex
                w='95%'
                mx='25%'
                alignSelf='center'
                borderColor='#ededed'
                flexDir='column'
                borderWidth={1}
                borderRadius='md'
                mt={6}
                p={6}
            >
                <FormControl
                    flexGrow={1}

                >
                    <FormLabel
                        htmlFor="matricula"
                        fontSize={['sm', 'md']}
                    >
                        Matrícula
                        </FormLabel>

                        <InputGroup size="md">
                        <Input
                        type="text"
                        id="matricula"
                        aria-describedby="matricula"

                        focusBorderColor='green.300'
                        borderRadius='sm'
                        _hover={{ borderColor: 'green.300' }}

                        isRequired
                        maxLength={8}
                        value={matricula}
                        onChange={handleMatricula}

                        onBlur={handleLoadData}

                    />
                        <InputRightElement width={["4.25rem", "4.75rem"]} mr={2}>
                            <Button 
                            isDisabled={digitando}
                            h="1.75rem" 
                            size="sm" 
                            backgroundColor='green.600' 
                            borderRadius='sm' 
                            color='#fff' 
                            onClick={handleLoadData}
                            fontSize={['xs', 'sm']}
                            >
                            {'Recuperar'}
                            </Button>
                        </InputRightElement>
                        </InputGroup>
                    
                </FormControl>

                <FormControl
                    flexGrow={1}

                >
                    <FormLabel
                        htmlFor="nome"
                        fontSize={['sm', 'md']}
                    >
                        Nome completo
                        </FormLabel>
                    <Input
                        type="text"
                        id="nome"
                        aria-describedby="nome-completo"

                        focusBorderColor='green.300'
                        borderRadius='sm'
                        _hover={{ borderColor: 'green.300' }}

                        value={nome}
                        onChange={handleNome}

                        isDisabled={loading? true : false}

                    />
                </FormControl>
                <Flex>


                </Flex>

                <Flex flexWrap='wrap'>
                    <FormControl flexGrow={1}>
                        <FormLabel
                            htmlFor="email"
                            fontSize={['sm', 'md']}
                        >
                            Email
                            </FormLabel>
                        <Input
                            type="email"
                            id="email"
                            aria-describedby="email"

                            focusBorderColor='green.300'
                            borderRadius='sm'
                            _hover={{ borderColor: 'green.300' }}

                            value={email}
                            onChange={handleEmail}

                            isDisabled={loading? true : false}
                        />
                    </FormControl>
                    <FormControl flexGrow={1} mx={[0, 4]}>
                        <FormLabel
                            htmlFor="birth"
                            fontSize={['sm', 'md']}
                        >
                            Data de nascimento
                            </FormLabel>
                        <Input
                            type="date"
                            id="birth"
                            aria-describedby="birth"

                            focusBorderColor='green.300'
                            borderRadius='sm'
                            _hover={{ borderColor: 'green.300' }}
                            value={birth}
                            onChange={handleBirth}

                            isDisabled={loading? true : false}
                        />
                    </FormControl>
                    <FormControl
                        flexGrow={1}
                    >
                        <FormLabel
                            htmlFor="turma"
                            fontSize={['sm', 'md']}
                        >
                            Turma
                        </FormLabel>
                        <Input
                            type="text"
                            id="turma"
                            aria-describedby="turma"

                            focusBorderColor='green.300'
                            borderRadius='sm'
                            _hover={{ borderColor: 'green.300' }}

                            value={turma}
                            onChange={handleTurma}
                            maxLength={2}

                            isDisabled={loading? true : false}
                        />
                    </FormControl>
                </Flex>
                <Flex mt={4}>
                    <FormControl flexGrow={1}>
                        <FormLabel
                            htmlFor="senha"
                            fontSize={['sm', 'md']}
                        >
                            Senha
                            </FormLabel>
                        <Input
                            type="password"
                            id="senha"
                            aria-describedby="senha"

                            focusBorderColor='green.300'
                            borderRadius='sm'
                            _hover={{ borderColor: 'green.300' }}
                            value={senha}
                            onChange={handleSenha}
                        />

                    </FormControl>
                    <Box w={4} />
                    <FormControl flexGrow={1}>
                        <FormLabel
                            htmlFor="senha_again"
                            fontSize={['sm', 'md']}
                        >
                            Senha (novamente)
                            </FormLabel>
                        <Input
                            type="password"
                            id="senha_again"
                            aria-describedby="senha_again"

                            focusBorderColor='green.300'
                            borderRadius='sm'
                            _hover={{ borderColor: 'green.300' }}
                            value={senhaAgain}
                            onChange={handleSenhaAgain}
                        />

                    </FormControl>
                </Flex>
            </Flex>
            <Flex
                w='95%'
                mt={6}
                justifyContent='center'
                alignSelf='center'
            >
                <Link href='/loja'>
                    <Button
                        h='45px'
                        w='100%'
                        borderRadius='sm'
                        backgroundColor='green.300'
                        color='#fff'
                        _hover={{ backgroundColor: 'green.600' }}
                        fontSize={['xs', 'sm', 'base']}
                    >
                        Finalizar cadastro
                    </Button>
                </Link>
            </Flex>

        </Flex>
    );
}

export default Carrinho;