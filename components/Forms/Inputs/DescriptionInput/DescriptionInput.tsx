import { Controller } from "react-hook-form";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
import "highlight.js/styles/monokai-sublime.css";
import hljs from "highlight.js";

interface DescriptionInputProps {
	control: any;
}

const DescriptionInput = ({ control }: DescriptionInputProps) => {
	const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

	const quillModules = {
		toolbar: [
			[{ header: [2, 3, false] }],
			["bold", "italic", "underline", "strike", "blockquote"],
			[
				{ script: "sub" },
				{ script: "super" },
				{ list: "ordered" },
				{ list: "bullet" },
				{ indent: "-1" },
				{ indent: "+1" },
			],
			["link", "image"],
			["code-block"],
		],
		syntax: {
			highlight: (text: string) => hljs.highlightAuto(text).value,
		},
	};

	return (
		<Controller
			control={control}
			name="description"
			render={({ field }) => (
				<ReactQuill
					value={field.value}
					onChange={(value) => field.onChange(value)}
					modules={quillModules}
					theme="snow"
				/>
			)}
		></Controller>
	);
};

export default DescriptionInput;
