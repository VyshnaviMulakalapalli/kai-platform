import React, { useState } from 'react';

import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import {
  Box,
  Button,
  FormControl,
  FormGroup,
  FormLabel,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import { getAuth } from 'firebase/auth';
import { doc, getFirestore, setDoc } from 'firebase/firestore';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useDropzone } from 'react-dropzone';

const ProfileSetup = ({ onNext }) => {
  const [name, setName] = useState('');
  const [occupation, setOccupation] = useState('');
  const [socialLinks, setSocialLinks] = useState({
    linkedIn: '',
    twitter: '',
    facebook: '',
  });
  const [bio, setBio] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);

  const handleDrop = (acceptedFiles) => {
    setProfilePicture(acceptedFiles[0]);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: handleDrop,
    accept: 'image/jpeg, image/png, application/pdf',
    maxSize: 1048576, // 1MB
  });

  const handleSubmit = async () => {
    const auth = getAuth();
    const db = getFirestore();
    const user = auth.currentUser;
    await setDoc(doc(db, 'users', user.uid), {
      name,
      occupation,
      socialLinks,
      bio,
      profilePicture: profilePicture ? profilePicture.name : '',
    });
    onNext();
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="120vh"
      sx={{
        background: 'linear-gradient(to right, #434343, #000000)',
        color: 'white',
        overflow: 'hidden',
      }}
    >
      <Box
        width="45%"
        height="100vh"
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
      >
        <Box>
          <Typography variant="h4" gutterBottom align="center" sx={{ mb: 1 }}>
            Profile Setup
          </Typography>
          <Typography
            variant="subtitle1"
            gutterBottom
            align="center"
            sx={{ mb: 2 }}
          >
            Get started by setting up your profile
          </Typography>
        </Box>
        <Box display="flex" justifyContent="center" flexGrow={1}>
          <FormControl component="fieldset" sx={{ width: '80%' }}>
            <FormGroup>
              <Box display="flex" flexDirection="row" gap={2}>
                <Box flex={1}>
                  <FormLabel component="legend">Full Name</FormLabel>
                  <TextField
                    placeholder="Enter Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    fullWidth
                    InputLabelProps={{ style: { color: 'white' } }}
                    InputProps={{
                      style: {
                        color: 'white',
                        borderRadius: '30px',
                        height: '40px',
                      },
                    }}
                  />
                </Box>
                <Box flex={1}>
                  <FormLabel component="legend">Occupation</FormLabel>
                  <TextField
                    placeholder="Enter Occupation"
                    value={occupation}
                    onChange={(e) => setOccupation(e.target.value)}
                    fullWidth
                    InputLabelProps={{ style: { color: 'white' } }}
                    InputProps={{
                      style: {
                        color: 'white',
                        borderRadius: '30px',
                        height: '40px',
                      },
                    }}
                  />
                </Box>
              </Box>
            </FormGroup>
            <FormGroup sx={{ mt: 1 }}>
              <FormLabel component="legend">Social Links</FormLabel>
              <Box display="flex" flexDirection="column" gap={2}>
                <TextField
                  placeholder="Paste Link"
                  value={socialLinks.facebook}
                  onChange={(e) =>
                    setSocialLinks({ ...socialLinks, facebook: e.target.value })
                  }
                  fullWidth
                  InputLabelProps={{ style: { color: 'white' } }}
                  InputProps={{
                    style: {
                      color: 'white',
                      borderRadius: '30px',
                      height: '40px',
                    },
                    startAdornment: (
                      <InputAdornment position="start">
                        <FacebookIcon style={{ color: 'white' }} />
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  placeholder="Paste Link"
                  value={socialLinks.linkedIn}
                  onChange={(e) =>
                    setSocialLinks({ ...socialLinks, linkedIn: e.target.value })
                  }
                  fullWidth
                  InputLabelProps={{ style: { color: 'white' } }}
                  InputProps={{
                    style: {
                      color: 'white',
                      borderRadius: '30px',
                      height: '40px',
                    },
                    startAdornment: (
                      <InputAdornment position="start">
                        <LinkedInIcon style={{ color: 'white' }} />
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  placeholder="Paste Link"
                  value={socialLinks.twitter}
                  onChange={(e) =>
                    setSocialLinks({ ...socialLinks, twitter: e.target.value })
                  }
                  fullWidth
                  InputLabelProps={{ style: { color: 'white' } }}
                  InputProps={{
                    style: {
                      color: 'white',
                      borderRadius: '30px',
                      height: '40px',
                    },
                    startAdornment: (
                      <InputAdornment position="start">
                        <TwitterIcon style={{ color: 'white' }} />
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
            </FormGroup>
            <FormGroup sx={{ mt: 2 }}>
              <FormLabel component="legend">Profile Picture</FormLabel>
              <Box
                {...getRootProps()}
                sx={{
                  border: '2px dashed white',
                  padding: '20px',
                  textAlign: 'center',
                  cursor: 'pointer',
                  borderRadius: '8px',
                }}
              >
                <input {...getInputProps()} />
                {profilePicture ? (
                  <Typography>{profilePicture.name}</Typography>
                ) : (
                  <Typography>
                    Drag & Drop OR Upload an image (Formats: JPG, PNG, PDF | Up
                    1MB)
                  </Typography>
                )}
              </Box>
            </FormGroup>
            <FormGroup sx={{ mt: 2 }}>
              <FormLabel component="legend">Bio</FormLabel>
              <TextField
                placeholder="Introduce yourself in a few words"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                multiline
                rows={2}
                fullWidth
                InputLabelProps={{ style: { color: 'white' } }}
                InputProps={{ style: { color: 'white', borderRadius: '20px' } }}
                helperText="Word Limit: 200 Words"
              />
            </FormGroup>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              fullWidth
              sx={{
                borderRadius: '8px',
                marginTop: '16px',
              }}
            >
              Next
            </Button>
          </FormControl>
        </Box>
      </Box>
    </Box>
  );
};

export default ProfileSetup;
