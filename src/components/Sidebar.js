import React, { useState } from 'react';
import {
  Box,
  Flex,
  IconButton,
  Icon,
  useColorModeValue,
  Text,
  CloseButton,
  Link as ChakraLink,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
  useDisclosure,
} from '@chakra-ui/react';
import { FiHome, FiMenu, FiUser, FiSettings, FiLogOut } from 'react-icons/fi';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import axios from 'axios';

const SidebarContent = ({ collapsed, ...rest }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Token not found');
      }

      // Faz a requisição de logout para a API
      await axios.post('http://127.0.0.1:8000/api/logout', {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Limpa o token do localStorage
      localStorage.removeItem('token');

      // Redireciona para a página de login
      navigate('/login');
    } catch (error) {
      console.error('Logout failed', error);
      alert('Logout failed');
    } finally {
      onClose(); // Fecha o modal após o logout, mesmo em caso de falha
    }
  };

  return (
    <Box
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={collapsed ? '70px' : '240px'} // Controla a largura do sidebar
      pos="fixed"
      h="full"
      transition="width 0.3s" // Adiciona uma transição suave ao expandir/recolher
      {...rest}
    >
      <Flex
        h="20"
        alignItems="center"
        mx={collapsed ? 'auto' : '8'}
        justifyContent={collapsed ? 'center' : 'space-between'}
      >
        <Text
          fontSize="2xl"
          fontFamily="monospace"
          fontWeight="bold"
          display={collapsed ? 'none' : 'block'}
        >
          Logo
        </Text>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={() => {}} />
      </Flex>
      <NavItem icon={FiHome} to="/home" collapsed={collapsed}>
        Home
      </NavItem>
      <NavItem icon={FiUser} to="/profile" collapsed={collapsed}>
        Profile
      </NavItem>
      <NavItem icon={FiSettings} to="/settings" collapsed={collapsed}>
        Settings
      </NavItem>
      <NavItem
        icon={FiLogOut}
        collapsed={collapsed}
        onClick={onOpen} // Abre o modal de confirmação ao clicar em "Sair"
      >
        Sair
      </NavItem>

      {/* Modal de Confirmação */}
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Confirmar Logout
            </AlertDialogHeader>

            <AlertDialogBody>
              Você tem certeza que deseja sair?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancelar
              </Button>
              <Button colorScheme="red" onClick={handleLogout} ml={3}>
                Sair
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
};

const NavItem = ({ icon, children, to, collapsed, onClick, ...rest }) => {
  return (
    <ChakraLink
      as={to ? RouterLink : 'button'} // Se 'to' for passado, é um link; caso contrário, é um botão
      to={to}
      style={{ textDecoration: 'none' }}
      _focus={{ boxShadow: 'none' }}
      onClick={onClick} // Adiciona o onClick se existir
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: 'cyan.400',
          color: 'white',
        }}
        justifyContent={collapsed ? 'center' : 'flex-start'}
        {...rest}
      >
        {icon && (
          <Icon
            mr={collapsed ? '0' : '4'}
            fontSize="16"
            as={icon}
            transition="margin 0.3s"
          />
        )}
        {!collapsed && <Text>{children}</Text>}
      </Flex>
    </ChakraLink>
  );
};

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(true);
  const [hovered, setHovered] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  return (
    <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
      <SidebarContent
        collapsed={collapsed && !hovered}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      />
      <Flex
        direction="column"
        alignItems="center"
        mt="4"
        p="4"
        pos="fixed"
        left={collapsed && !hovered ? '70px' : '240px'} // Coloca o botão logo ao lado do Sidebar
        transition="left 0.3s" // Transição suave ao mover o botão
        zIndex="1000"
      >
        <IconButton
          aria-label="open menu"
          icon={<FiMenu />}
          onClick={toggleSidebar}
          mb="4"
        />
      </Flex>
    </Box>
  );
};

export default Sidebar;
