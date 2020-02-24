import React from "react";
import clsx from "clsx";

import { makeStyles, createStyles, Grid } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";

import { useFiretableContext } from "contexts/firetableContext";

const useStyles = makeStyles(theme =>
  createStyles({
    renderedHtmlContainer: {
      maxWidth: "calc(100% - 24px - 8px)",
      marginTop: theme.spacing(2),
    },
    renderedHtml: {
      minHeight: "1.25em",
      "& > *:first-child": { marginTop: 0 },
    },
  })
);

interface Props {
  value: any;
  row: {
    ref: firebase.firestore.DocumentReference;
    id: string;
    rowHeight: number;
  };
  onSubmit: Function;
}

const RichText = (props: Props) => {
  const { setSideDrawerOpen } = useFiretableContext();
  const { value, row } = props;
  const classes = useStyles();
  return (
    <Grid
      container
      onDoubleClick={() => {
        if (setSideDrawerOpen) setSideDrawerOpen(true);
      }}
      spacing={1}
      alignItems="center"
    >
      <Grid item>
        <EditIcon />
      </Grid>
      <Grid item xs className={classes.renderedHtmlContainer}>
        <div
          dangerouslySetInnerHTML={{ __html: value }}
          className={clsx("rendered-html", classes.renderedHtml)}
          style={{ maxHeight: row.rowHeight }}
        />
      </Grid>
    </Grid>
  );
};
export default RichText;