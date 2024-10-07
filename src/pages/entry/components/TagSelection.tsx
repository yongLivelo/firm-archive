import { useEffect, useState } from "react";
import { Button, FormGroup, FormControl, Container } from "react-bootstrap";

interface Props {
  sendTags: (arg: any) => void;
  type: string;
}

interface TagSelection {
  id: number;
  category: undefined | string;
  selections: string[];
}

function TagSelection({ ...Props }: Props) {
  const [tagSelections, setTagSelections] = useState<TagSelection[]>([]);

  const init = () => {
    setTagSelections([
      { id: Date.now(), category: undefined, selections: ["", ""] },
    ]);
  };
  useEffect(() => {
    Props.sendTags(tagSelections);
  }, [tagSelections]);

  const addTag = (index: number) => {
    const newTag = {
      id: Date.now(),
      category: undefined,
      selections: ["", ""],
    };

    const updatedTags = [
      ...tagSelections.slice(0, index + 1),
      newTag,
      ...tagSelections.slice(index + 1),
    ];
    setTagSelections(updatedTags);
  };

  const subtractTag = (id: number) => {
    setTagSelections(tagSelections.filter((tag) => tag.id !== id));
  };

  const addTagSelection = (id: number) => {
    const updatedTags = tagSelections.map((tag) => {
      if (tag.id === id) {
        return { ...tag, selections: [...tag.selections, ""] };
      }
      return tag;
    });
    setTagSelections(updatedTags);
  };

  const subtractTagSelection = (id: number) => {
    const updatedTags = tagSelections.map((tag) => {
      if (tag.id === id && tag.selections.length > 2) {
        return { ...tag, selections: tag.selections.slice(0, -1) };
      }
      return tag;
    });
    setTagSelections(updatedTags);
  };

  const handleCategoryChange = (id: number, value: string) => {
    const updatedTags = tagSelections.map((tag) => {
      if (tag.id === id) {
        return { ...tag, category: value };
      }
      return tag;
    });
    setTagSelections(updatedTags);
  };
  const handleSelectionChange = (
    id: number,
    selectionIndex: number,
    value: string
  ) => {
    const updatedTags = tagSelections.map((tag) => {
      if (tag.id === id) {
        const updatedSelections = [...tag.selections];
        updatedSelections[selectionIndex] = value;
        return { ...tag, selections: updatedSelections };
      }
      return tag;
    });
    setTagSelections(updatedTags);
  };

  const handleDragStart = (e: any, index: number) => {
    e.dataTransfer.setData("text/plain", index);
  };

  const handleDrop = (e: any, dropIndex: number) => {
    const dragIndex = e.dataTransfer.getData("text/plain");
    const updatedTags = [...tagSelections];
    const [movedTag] = updatedTags.splice(dragIndex, 1);
    updatedTags.splice(dropIndex, 0, movedTag);
    setTagSelections(updatedTags);
  };

  useEffect(() => {
    const getTag = JSON.parse(localStorage?.getItem("tags") as string);
    if (!getTag) return;
    switch (Props.type) {
      case "sales":
        setTagSelections(getTag.sales || tagSelections);
        break;
      case "expenses":
        setTagSelections(getTag.expenses || tagSelections);
        break;
    }
  }, []);
  return (
    <>
      {!tagSelections.length ? (
        <Container>
          <Button onClick={init}>No Tags, click to create one</Button>
        </Container>
      ) : (
        tagSelections.map((tag, index) => (
          <div
            key={tag.id}
            draggable
            onDragStart={(e) => handleDragStart(e, index)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => handleDrop(e, index)}
            className="w-auto d-flex gap-2 mb-2 p-2"
            style={{ height: "fit-content" }}
          >
            <FormGroup className="border rounded p-2 bg-light">
              <FormControl
                value={tag.category}
                required
                className="mb-2"
                placeholder="Category"
                onChange={(e) => handleCategoryChange(tag.id, e.target.value)}
              />
              {tag.selections.map((selection, j) => (
                <FormControl
                  required
                  key={j}
                  className="mb-2"
                  placeholder="Selection"
                  value={selection}
                  onChange={(e) =>
                    handleSelectionChange(tag.id, j, e.target.value)
                  }
                />
              ))}

              <div className="d-flex gap-2">
                <Button
                  onClick={() => addTagSelection(tag.id)}
                  className="square"
                >
                  +
                </Button>
                <Button
                  onClick={() => subtractTagSelection(tag.id)}
                  className="square"
                >
                  -
                </Button>
              </div>
            </FormGroup>
            <div className="d-flex flex-column gap-2">
              <Button onClick={() => addTag(index)}>Add Tag</Button>
              <Button onClick={() => subtractTag(tag.id)}>Remove Tag</Button>
            </div>
          </div>
        ))
      )}
    </>
  );
}

export default TagSelection;
