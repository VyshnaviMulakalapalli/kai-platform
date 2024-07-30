import React from 'react';
import { Box, Typography, Button } from '@mui/material';

const WelcomeScreen = ({ onStart }) => {
    return (
        <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
            bgcolor="#2a2a3c"
            color="white"
            padding={2}
        >
            <Typography variant="h4" gutterBottom>
                Welcome to <span style={{ color: '#8a2be2' }}>Kai</span> <span role="img" aria-label="wave">👋</span>
            </Typography>
            <Typography variant="body1" gutterBottom>
                Let's get started!
            </Typography>
            <br />
            <Button
                variant="contained"
                color="primary"
                onClick={onStart}
                sx={{
                    bgcolor: '#8a2be2',
                    borderRadius: '25px',
                    width: '200px',
                    textTransform: 'none',
                }}
            >
                Start Here!
            </Button>
        </Box>
    );
};

export default WelcomeScreen;
