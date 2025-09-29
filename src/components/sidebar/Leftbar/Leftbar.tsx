/** @jsxImportSource @emotion/react */
import { useState } from "react";
import { LeftbarPosition } from "./LeftbarPosition";
import { useThemeColors } from "../../../hooks/useThemeColors";
import { itemMixin, SidebarColor, sideBarMixin } from "../../../styles/mixins";
import { GlassmorphismDesign } from "../../../styles/baseDesign/GlassmorphismDesign";
import DragAndDrop from "../../dragAndDrop/DragAndDrop";

type MOCDATA = {
  id: number;
  title: string;
  value: string;
};

export function Leftbar() {
  const [items, setItems] = useState<MOCDATA[]>(
    Array.from({ length: 20 }, (_, idx) => {
      return { id: idx, title: `chat${idx}`, value: `value${idx}` };
    })
  );

  const { text, background } = useThemeColors();

  const sidebarColor = SidebarColor(text, background);

  const handleClick = () => {
    //해당 채팅으로 이동 로직
  };

  return (
    <LeftbarPosition>
      <GlassmorphismDesign>
        <div css={[sideBarMixin, sidebarColor]}>
          <div>새 채팅</div>
          <div>model</div>
          <hr />
          <span>voice</span>
          <div>음성인식</div>
          <hr />
          <div>검색</div>
          <hr />
          <DragAndDrop
            items={items}
            onItemsChange={setItems}
            dragTitle={"title"}
          >
            {items.map((el) => {
              return (
                <div key={el.id} css={itemMixin} onClick={handleClick}>
                  {el.value}
                </div>
              );
            })}
          </DragAndDrop>
        </div>
      </GlassmorphismDesign>
    </LeftbarPosition>
  );
}

