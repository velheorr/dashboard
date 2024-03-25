import React from 'react';
import {Skeleton, Stack} from "@mui/material";
import BlockShadow from "./BlockShadow";

const Skelet = () => {
    return (
        <div style={{width: '90%', margin: '0 auto',padding: '20px 0'}}>

                {/* For variant="text", adjust the height via font-size */}
                <div style={{display: 'inline-flex'}}>
                    <Skeleton variant="text" sx={{ fontSize: '2rem', mr: 1 }} width={300}/>
                    <Skeleton variant="text" sx={{ fontSize: '2rem',  mr: 1 }} width={300}/>
                    <Skeleton variant="text" sx={{ fontSize: '2rem' }} width={300}/>
                </div>
                <div>
                    <Skeleton variant="text" sx={{ fontSize: '2rem', margin: '0 auto' }} width={300}/>
                </div>
               <div style={{display: "flex", flexWrap: 'wrap'}}>
                   <BlockShadow style={{width: '48%'}}>
                       <Skeleton variant="text" sx={{ fontSize: '2rem', margin: '0 auto'}} width={300}/>
                       <Skeleton variant="rounded" height={40} sx={{m: 1}} width={600}/>
                       <Skeleton variant="rounded" height={40} sx={{m: 1}}/>
                       <Skeleton variant="rounded" height={40} sx={{m: 1}}/>
                       <Skeleton variant="rounded" height={40} sx={{m: 1}}/>
                       <Skeleton variant="rounded" height={40} sx={{m: 1}}/>
                   </BlockShadow>
                   <BlockShadow style={{width: '48%'}}>
                       <Skeleton variant="text" sx={{ fontSize: '2rem', margin: '0 auto'}} width={300}/>
                       <Skeleton variant="rounded" height={40} sx={{m: 1}} width={600}/>
                       <Skeleton variant="rounded" height={40} sx={{m: 1}}/>
                       <Skeleton variant="rounded" height={40} sx={{m: 1}}/>
                       <Skeleton variant="rounded" height={40} sx={{m: 1}}/>
                       <Skeleton variant="rounded" height={40} sx={{m: 1}}/>
                   </BlockShadow>
                   <BlockShadow style={{width: '48%'}}>
                       <Skeleton variant="text" sx={{ fontSize: '2rem', margin: '0 auto'}} width={300}/>
                       <Skeleton variant="rounded" height={40} sx={{m: 1}} width={600}/>
                       <Skeleton variant="rounded" height={40} sx={{m: 1}}/>
                       <Skeleton variant="rounded" height={40} sx={{m: 1}}/>
                       <Skeleton variant="rounded" height={40} sx={{m: 1}}/>
                       <Skeleton variant="rounded" height={40} sx={{m: 1}}/>
                   </BlockShadow>
                   <BlockShadow style={{width: '48%'}}>
                       <Skeleton variant="text" sx={{ fontSize: '2rem', margin: '0 auto'}} width={300}/>
                       <Skeleton variant="rounded" height={40} sx={{m: 1}} width={600}/>
                       <Skeleton variant="rounded" height={40} sx={{m: 1}}/>
                       <Skeleton variant="rounded" height={40} sx={{m: 1}}/>
                       <Skeleton variant="rounded" height={40} sx={{m: 1}}/>
                       <Skeleton variant="rounded" height={40} sx={{m: 1}}/>
                   </BlockShadow>

               </div>

                {/* For other variants, adjust the size with `width` and `height` */}
              {/*  <Skeleton variant="circular" width={40} height={40} />
                <Skeleton variant="rectangular" width={210} height={60} />
                <Skeleton variant="rounded" width={210} height={60} />*/}

        </div>
    );
};

export default Skelet;