import React from 'react';
import {Tooltip} from "recharts";
import {styled, tooltipClasses, Typography} from "@mui/material";

const HtmLtoolTip = () => {
    const HtmlTooltip = styled(({ className, ...props }) => (
        <Tooltip {...props} classes={{ popper: className }} />
    ))(({ theme }) => ({
        [`& .${tooltipClasses.tooltip}`]: {
            backgroundColor: '#f5f5f9',
            color: 'rgba(0, 0, 0, 0.87)',
            maxWidth: 220,
            fontSize: theme.typography.pxToRem(12),
            border: '1px solid #dadde9',
        },
    }));

    return (
        <HtmlTooltip
            title={
                <React.Fragment>
                    <Typography color="inherit">Tooltip with HTML</Typography>
                    <em>{"And here's"}</em> <b>{'some'}</b> <u>{'amazing content'}</u>.{' '}
                    {"It's very engaging. Right?"}
                </React.Fragment>
            }
        >
            <span>HTML</span>
        </HtmlTooltip>
    );
};

export default HtmLtoolTip;