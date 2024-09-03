import * as React from 'react';
import { useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CloseIcon from '@mui/icons-material/Close';
import { signOut, checkSession } from '../auth/authService';
import { useNavigate } from 'react-router-dom';

const pages = ['videos', 'resources', 'pricing', 'contact'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [anchorElTutorials, setAnchorElTutorials] = React.useState(null);
  const [sideNavOpen, setSideNavOpen] = React.useState(false);
  const [tutorialsTabOpen, setTutorialsTabOpen] = React.useState(false);
  const [signedIn, setSignedIn] = React.useState(false);

  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenSideMenu = () => {
    setSideNavOpen(true);
  }

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleOpenTutorialsMenu = (event) => {
    setAnchorElTutorials(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleCloseTutorialsMenu = () => {
    setAnchorElTutorials(null);
  };

  const handleCloseSideMenu = () => {
    setSideNavOpen(false);
  }

  const checkSignInStatus = async () => {

      const isLoggedIn = await checkSession();
      if (isLoggedIn) {
          setSignedIn(true);
      } else {
          setSignedIn(false);
      }
  };

  const handleLogout = async () => {
    try {
      await signOut();
      setSignedIn(false);
      navigate('/');
    } catch (error) {
      console.error('Error signing out: ', error);
    }
  };

  useEffect(() => {
    checkSignInStatus();
  }, []);

  return (
    <AppBar position="absolute" color='transparent'>
      <div className='pl-[100px] pr-[100px]'>
        <Container maxWidth="xxl">
          <Toolbar disableGutters>
            {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'white',
                textDecoration: 'none',
              }}
            >
              <a href='/'>LOGO</a>
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenSideMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <div
                // tailwind classname that has a fixed position to the left of the screen and will have a height all the way down the screen. Will be hidden unless the sideNavOpen state is true
                className={`fixed left-0 top-0 h-screen w-96 bg-black z-50 ${sideNavOpen ? 'block' : 'hidden'}`}
                onClick={handleCloseNavMenu}
              >
                {/* <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleCloseSideMenu}
                  color="inherit"
                >
                <MenuIcon />
                </IconButton> */}
                <div>
                  <div className='flex p-3 justify-between'>
                    {/* Add the logo to the left and an "X" icon from Material UI to close the sidebar using handleCloseSideMenu for the onclick of the "X" */}
                    <Typography variant="h6" noWrap component="a" href="/" sx={{ mr: 2, display: { xs: 'flex', md: 'none' }, p: 1, fontFamily: 'monospace', fontWeight: 700, letterSpacing: '.3rem', color: 'inherit', textDecoration: 'none' }}>LOGO</Typography>
                    <IconButton size="large" aria-label="account of current user" aria-controls="menu-appbar" aria-haspopup="true" onClick={handleCloseSideMenu} color="inherit"> 
                      <CloseIcon /> 
                    </IconButton>
                  </div>
                  <div className='flex flex-col'>
                    {pages.map((page) => (
                      <div className='hover:bg-stealPink mb-2 pl-5 pt-2 pb-2'>
                        <a href={`/${page}`}><p key={page} className="text-white text-paragraph" style={{fontFamily: 'monospace'}}>{page}</p></a>
                      </div>
                    ))}
                    {/* {pages.map((page) => (
                      page === 'tutorials' ? (
                        <div>
                          <div className={`flex justify-between ${tutorialsTabOpen ? 'bg-stealPink' : null} hover:bg-stealPink pl-5 pt-2 pb-2`} style={{cursor: 'pointer'}} onClick={() => setTutorialsTabOpen(!tutorialsTabOpen)}>
                            <p key={page} className="text-white text-paragraph" style={{fontFamily: 'monospace'}}>{page}</p>
                          </div>
                          <div className={`flex flex-col bg-gray-800 ${tutorialsTabOpen ? 'block' : 'hidden'}`}>
                            <div className='hover:bg-dark pl-9 '>
                              <a href='/tutorials/punish-game'><p key={page} className="text-white text-paragraph pt-2 pb-2" style={{fontFamily: 'monospace'}}>Punish Game</p></a>
                            </div>
                            <div className='hover:bg-dark pl-9 '>
                              <a href='/tutorials/neutral-game'><p key={page} className="text-white text-paragraph pt-2 pb-2" style={{fontFamily: 'monospace'}}>Neutral Game</p></a>
                            </div>
                            <div className='hover:bg-dark pl-9 '>
                              <a href='/tutorials/edgeguard-game'><p key={page} className="text-white text-paragraph pt-2 pb-2" style={{fontFamily: 'monospace'}}>Edgeguard Game</p></a>
                            </div>
                          </div>
                        </div>
                    ) : (
                      <div className='hover:bg-stealPink mb-2 pl-5 pt-2 pb-2'>
                        <a href={`/${page}`}><p key={page} className="text-white text-paragraph" style={{fontFamily: 'monospace'}}>{page}</p></a>
                      </div>
                    )
                    ))} */}
                  </div>
                </div>
              </div>
              {/* <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                {pages.map((page) => (
                  <MenuItem
                    key={page}
                    onClick={() => {
                      handleCloseNavMenu();
                      if (page === 'Tutorials') {
                        handleOpenTutorialsMenu(); // Open Tutorials dropdown
                      }
                    }}
                  >
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))}
              </Menu> */}
            </Box>
            <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              LOGO
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pages.map((page) => (
                <a href={`/${page}`}>
                <Button 
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  {page}
                </Button>
              </a>
              ))}
              {/* {pages.map((page) => (
                page === 'tutorials' ? (
                  <Button
                    key={page}
                    onClick={handleOpenTutorialsMenu}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                  >
                    {page}
                    <ExpandMoreIcon />
                  </Button>
                ) : (
                  <a href={`/${page}`}>
                    <Button 
                      key={page}
                      onClick={handleCloseNavMenu}
                      sx={{ my: 2, color: 'white', display: 'block' }}
                    >
                      {page}
                    </Button>
                  </a>
                )
              ))} */}
            </Box>

            {/* Profile icon button men -> Needs login state condition to work with login/register buttons */}
            {signedIn ? (
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="Remy Sharp" src="/static/images/avatar2.jpg" />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: '45px'}}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => (
                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                      {/* Add conditional rendering if logout for now */}
                      {setting === 'Logout' ? (
                        <Typography textAlign="center" onClick={handleLogout}>{setting}</Typography>
                      ) : setting === 'Profile' ? (
                        <a href='/profile'><Typography textAlign="center">{setting}</Typography></a>
                      ) : (
                        <Typography textAlign="center">{setting}</Typography>
                      )}
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
              
            ) : (
              <div className="flex flex-row items-center justify-center gap-[16px] text-text-primary">
                <a href='/login'><button className="bg-white text-black py-2 px-5 border-[1px] border-solid border-black">Log In</button></a>
                <a href='/register'><button className="bg-gray-950 py-2 px-5 text-border-alternate border-[1px] text-white ">Register</button></a>
              </div>
            )}

          </Toolbar>
        </Container>
      </div>
      {/* Tutorials Menu */}
      <Menu
        sx={{ mt: '5px'}}
        id="Tutorials-menu"
        anchorEl={anchorElTutorials} // Using anchorElNav here
        open={Boolean(anchorElTutorials)}
        onClose={handleCloseTutorialsMenu}
        elevation={0}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <MenuItem onClick={handleCloseTutorialsMenu}><a href='/tutorials/punish-game'>Punish Game</a></MenuItem>
        <MenuItem onClick={handleCloseTutorialsMenu}><a href='/tutorials/neutral-game'>Neutral Game</a></MenuItem>
        <MenuItem onClick={handleCloseTutorialsMenu}><a href='/tutorials/edgeguard-game'>Edgeguard Game</a></MenuItem>
      </Menu>
    </AppBar>
  );
}
export default ResponsiveAppBar;
