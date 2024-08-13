import { Card, CardContent, CardMedia, Typography, Box, TextField, Checkbox, FormControlLabel } from '@mui/material';

const ImageCard = ({ image, title,subtitle, description, inputValue, onInputChange, onCheckboxChange, checked }) => {
  
  return (
  <>
        <Card sx={{ maxWidth: 345, margin: '20px' }}>
      <CardMedia
        component="img"
        height="140"
        image={image}
        alt={title}
      />
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          {title}
        </Typography>
        <Typography variant="h6" color="text.secondary" gutterBottom>
          {subtitle}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>

        <TextField
          fullWidth
          label="Insira os dados"
          variant="outlined"
          value={inputValue}
          onChange={onInputChange}
          sx={{ mb: 2 }}
        />
        <Box>
          <FormControlLabel
            control={
              <Checkbox
                checked={checked.available}
                onChange={(e) => onCheckboxChange('available', e.target.checked)}
              />
            }
            label="Disponível"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={checked.reserved}
                onChange={(e) => onCheckboxChange('reserved', e.target.checked)}
              />
            }
            label="Reservado"
          />
        </Box>
      </CardContent>
    </Card>
 
    </>
  );
};

export default ImageCard;
