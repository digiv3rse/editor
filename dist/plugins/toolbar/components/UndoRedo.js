import { mergeRegister } from "@lexical/utils";
import { useCellValues } from "@mdxeditor/gurx";
import { CAN_UNDO_COMMAND, COMMAND_PRIORITY_CRITICAL, CAN_REDO_COMMAND, UNDO_COMMAND, REDO_COMMAND } from "lexical";
import React__default from "react";
import { IS_APPLE } from "../../../utils/detectMac.js";
import { iconComponentFor$, activeEditor$, useTranslation } from "../../core/index.js";
import { MultipleChoiceToggleGroup } from "../primitives/toolbar.js";
const UndoRedo = () => {
  const [iconComponentFor, activeEditor] = useCellValues(iconComponentFor$, activeEditor$);
  const [canUndo, setCanUndo] = React__default.useState(false);
  const [canRedo, setCanRedo] = React__default.useState(false);
  const t = useTranslation();
  React__default.useEffect(() => {
    if (activeEditor) {
      return mergeRegister(
        activeEditor.registerCommand(
          CAN_UNDO_COMMAND,
          (payload) => {
            setCanUndo(payload);
            return false;
          },
          COMMAND_PRIORITY_CRITICAL
        ),
        activeEditor.registerCommand(
          CAN_REDO_COMMAND,
          (payload) => {
            setCanRedo(payload);
            return false;
          },
          COMMAND_PRIORITY_CRITICAL
        )
      );
    }
  }, [activeEditor]);
  return /* @__PURE__ */ React__default.createElement(
    MultipleChoiceToggleGroup,
    {
      items: [
        {
          title: t("toolbar.undo", "Undo {{shortcut}}", { shortcut: IS_APPLE ? "⌘Z" : "Ctrl+Z" }),
          disabled: !canUndo,
          contents: iconComponentFor("undo"),
          active: false,
          onChange: () => activeEditor == null ? void 0 : activeEditor.dispatchCommand(UNDO_COMMAND, void 0)
        },
        {
          title: t("toolbar.redo", "Redo {{shortcut}}", { shortcut: IS_APPLE ? "⌘Y" : "Ctrl+Y" }),
          disabled: !canRedo,
          contents: iconComponentFor("redo"),
          active: false,
          onChange: () => activeEditor == null ? void 0 : activeEditor.dispatchCommand(REDO_COMMAND, void 0)
        }
      ]
    }
  );
};
export {
  UndoRedo
};
