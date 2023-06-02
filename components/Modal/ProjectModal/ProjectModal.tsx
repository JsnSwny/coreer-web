import Button from "@/components/Button/Button";
import { Project } from "@/interfaces/project.model";
import { faRobot, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./ProjectModal.module.scss";
import {useState} from "react";

interface ProjectModalProps {
	project: Project;
	isOpen: boolean;
  onClose: () => void;
}

interface Block {
  type: string;
  content: string;
}

const ProjectModal = ({project, onClose, isOpen}: ProjectModalProps) => {
	const [blocks, setBlocks] = useState<Block[]>([]); // Array to hold the blocks

  const handleAddBlock = (type: string) => {
    const newBlock: Block = {
      type,
      content: "",
    };
    setBlocks((prevBlocks: any) => [...prevBlocks, newBlock]);
  };

  const handleBlockContentChange = (index: number, content: string) => {
    setBlocks((prevBlocks: any) => {
      const updatedBlocks = [...prevBlocks];
      updatedBlocks[index].content = content;
      return updatedBlocks;
    });
  };

	if (!isOpen) {
    return null;
  }
	return <div className={styles.modal}>
	<div className={styles.modalContent}>
	<div
        className={styles.placeholder}
      >

        {project.image && <img className={styles.image} src={project.image} />}
        {!project.image && (
          <FontAwesomeIcon icon={faRobot} className={styles.placeholderIcon} />
        )}
      </div>
			<button className={styles.closeButton} onClick={onClose}>
					<FontAwesomeIcon icon={faXmark} />
				</button>
			<div className={styles.modalHeader}>
				<div>
					<h3 className={styles.title}>{project.title}</h3>
					<p className={styles.description}>{project.description}</p>
				</div>
				<div className={styles.buttons}>
					<Button text="Repo" alt={true} />
					<Button text="View Project" />
				</div>
			</div>

			<div className={styles.modalBody}>
				{/* Allow user to add content */}
				{/* Render the blocks based on the blocks state */}
				{blocks.map((block, index) => {
            if (block.type === "heading1") {
              return (
                <h1
                  key={index}
                  contentEditable={true}
                  onBlur={(event) =>
                    handleBlockContentChange(index, event.target.textContent || "")
                  }
                >
                  {block.content}
                </h1>
              );
            } else if (block.type === "heading2") {
              return (
                <h2
                  key={index}
                  contentEditable={true}
                  onBlur={(event) =>
                    handleBlockContentChange(index, event.target.textContent || "")
                  }
                >
                  {block.content}
                </h2>
              );
            } else if (block.type === "heading3") {
              return (
                <h3
                  key={index}
                  contentEditable={true}
                  onBlur={(event) =>
                    handleBlockContentChange(index, event.target.textContent || "")
                  }
                >
                  {block.content}
                </h3>
              );
            } else if (block.type === "paragraph") {
              return (
                <p
                  key={index}
                  contentEditable={true}
                  onBlur={(event) =>
                    handleBlockContentChange(index, event.target.textContent || "")
                  }
                >
                  {block.content}
                </p>
              );
            }
            return null;
          })}
          {/* Buttons to add different block types */}
          <div>
            <button onClick={() => handleAddBlock("heading1")}>Add Heading 1</button>
            <button onClick={() => handleAddBlock("heading2")}>Add Heading 2</button>
            <button onClick={() => handleAddBlock("heading3")}>Add Heading 3</button>
            <button onClick={() => handleAddBlock("paragraph")}>Add Paragraph</button>
          </div>
			</div>
	</div>
</div>
}

export default ProjectModal;