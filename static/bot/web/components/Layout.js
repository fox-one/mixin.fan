import React from 'react';
import Head from 'next/head';
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';

import PropTypes from 'prop-types';

export default function Layout({title = 'On regular investing calculator', loading = false, children, ...props}) {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      {loading && <LinearProgress style={{position: 'absolute', width: '100%', zIndex: '9999'}} color="secondary" />}
      <Box {...props}>
        {children}
      </Box>
    </>
  );
}

Layout.propTypes = {
  title: PropTypes.string,
  loading: PropTypes.bool,
  children: PropTypes.node,
};
