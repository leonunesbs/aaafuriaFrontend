import React from 'react';
import { Divider as ChakraDivider, Grid } from '@chakra-ui/core';

const Divider: React.FC = () => {
    return (
        <Grid
            gridTemplateRows='1fr 1fr'
            columnGap={12}
            opacity={0.4}
        >
            <ChakraDivider marginY={1} />
        </Grid>
    );
}

export default Divider;