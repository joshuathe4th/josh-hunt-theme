// Import necessary components from WordPress libraries
const { registerBlockType } = wp.blocks;
const { TextControl } = wp.components;
const { InspectorControls } = wp.blockEditor;

// Register a new Gutenberg block
registerBlockType('custom/text-field-block', {
  title: 'Text Field Block', // Block title
  icon: 'text', // Block icon from Dashicons
  category: 'common', // Block category

  // Block attributes
  attributes: {
    content: {
      type: 'string',
      default: '',
    },
  },

  // Block editor rendering
  edit: function(props) {
    const { attributes, setAttributes } = props;

    // Handler for updating the content attribute
    const onContentChange = (newContent) => {
      setAttributes({ content: newContent });
    };

    return (
      <div>
        {/* Block editor content */}
        <p>Block Content: {attributes.content}</p>

        {/* Inspector Controls */}
        <InspectorControls>
          <TextControl
            label="Enter Text"
            value={attributes.content}
            onChange={onContentChange}
          />
        </InspectorControls>
      </div>
    );
  },

  // Block save rendering
  save: function(props) {
    const { attributes } = props;

    return (
      <div>
        {/* Saved block content */}
        <p>Block Content: {attributes.content}</p>
      </div>
    );
  },
});
