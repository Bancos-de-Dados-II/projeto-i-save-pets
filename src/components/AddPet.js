import React, { useState } from 'react';
import { TextField, MenuItem, Button, Grid, Typography, Box } from '@mui/material';

function AddPet({ handleSubmit, marker, onClose }) {
    const [formData, setFormData] = useState({
        type: '',
        name: '',
        age: '',
        gender: '',
        color: '',
        description: '',
        adoptionStatus: 'Available',
        coordinates: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    return (
        <Box p={3}>
            <form onSubmit={(e) => {
                e.preventDefault();
                handleSubmit({
                    ...formData,
                    localization: {
                        type: "Point",
                        coordinates: marker
                    }
                })
            }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            select
                            label="Type"
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                            required
                        >
                            <MenuItem value="Cat">Cat</MenuItem>
                            <MenuItem value="Dog">Dog</MenuItem>
                        </TextField>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            type="number"
                            label="Age"
                            name="age"
                            value={formData.age}
                            onChange={handleChange}
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            select
                            label="Gender"
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            required
                        >
                            <MenuItem value="Male">Male</MenuItem>
                            <MenuItem value="Female">Female</MenuItem>
                        </TextField>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Color"
                            name="color"
                            value={formData.color}
                            onChange={handleChange}
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            multiline
                            rows={4}
                            label="Description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            select
                            label="Adoption Status"
                            name="adoptionStatus"
                            value={formData.adoptionStatus}
                            onChange={handleChange}
                            required
                        >
                            <MenuItem value="Available">Available</MenuItem>
                            <MenuItem value="Adopted">Adopted</MenuItem>
                        </TextField>
                    </Grid>
                    
                    <Grid item xs={12} gap={'1rem'}>
                        <Button variant="contained" color="primary" type="submit">
                            Adicionar
                        </Button>
                        <Button variant="contained" onClick={onClose}>
                            Fechar
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Box>
    )
}

export default AddPet;