import React from 'react';
import { TextField, MenuItem, Button, Grid, Typography, Box } from '@mui/material';

function EditPet({ data, handleEditPet }) {
    const [formData, setFormData] = React.useState({
        type: data.type,
        name: data.name,
        age: data.age,
        gender: data.gender,
        color: data.color,
        description: data.description,
        adoptionStatus: data.adoptionStatus,
        localization: data.localization
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleEditPet({ ...formData, id: data._id })
    };


    return (
        <Box p={3}>
            <Typography variant="h4" gutterBottom>
                Editar Pet
            </Typography>
            <form onSubmit={handleSubmit}>
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
                    {/* <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Localization"
                            name="localization"
                            value={formData.localization}
                            onChange={handleChange}
                            required
                        />
                    </Grid> */}
                    <Grid item xs={12}>
                        <Button variant="contained" color="primary" type="submit">
                            Submit
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Box>
    )
}

export default EditPet;