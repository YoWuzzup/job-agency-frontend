import usePagination, { UsePaginationProps } from "@mui/material/usePagination";
import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";

import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const List = styled("ul")({
  listStyle: "none",
  padding: 0,
  margin: 0,
  display: "flex",
});

export const Pagination: React.FC<UsePaginationProps> = ({
  count,
  defaultPage,
  onChange,
}) => {
  const { items } = usePagination({
    count,
    defaultPage,
    onChange,
  });

  return (
    <nav>
      <List
        sx={{
          display: "flex",
          flexFlow: { xs: "row wrap", sm: "row nowrap" },
          justifyContent: "center",
          alignItems: "center",
          margin: "60px 0",
          gap: "2px",
        }}
      >
        {items.map(({ page, type, selected, ...item }, index) => {
          let children = null;

          if (type === "start-ellipsis" || type === "end-ellipsis") {
            children = "";
          } else if (type === "page") {
            children = (
              <Button
                type="button"
                sx={{
                  minWidth: "44px",
                  height: "44px",
                  border: "none",
                  padding: "0",
                  margin: "0",
                  borderRadius: "4px",
                  backgroundColor: selected
                    ? "background.main"
                    : "background.default",
                  color: selected ? "background.default" : "primary.dark",
                  "&:hover": {
                    backgroundColor: selected
                      ? "background.main"
                      : "primary.dark",
                    color: selected ? "background.default" : "primary.main",
                  },
                }}
                {...item}
              >
                {page}
              </Button>
            );
          } else {
            children = (
              <Button
                type="button"
                {...item}
                sx={{
                  minWidth: "44px",
                  height: "44px",
                  border: "none",
                  padding: "0",
                  margin: "0",
                  borderRadius: "4px",
                  backgroundColor: "background.paper",
                  color: "primary.dark",
                  "&:hover": {
                    backgroundColor: "primary.dark",
                    color: "primary.main",
                  },
                }}
              >
                {type === "previous" ? (
                  <ArrowBackIosNewIcon sx={{ width: "16px", height: "16px" }} />
                ) : (
                  <ArrowForwardIosIcon sx={{ width: "20px", height: "20px" }} />
                )}
              </Button>
            );
          }

          return <li key={index}>{children}</li>;
        })}
      </List>
    </nav>
  );
};
