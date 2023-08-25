// index.js
import { registerBlockType } from '@wordpress/blocks';
import { RichText } from '@wordpress/block-editor';
import { useState } from '@wordpress/element';


registerBlockType('my-gutenberg-block/scroll-text', {
  title: 'Scroll Text',
  icon: 'editor-textcolor',
  category: 'common',
  supports: {
    color: {
        text: true,
        background: true,
        link: true
    }
  },

  attributes: {
    text: {
      type: 'string',
      source: 'html',
      selector: 'h1',
    }, 
  },

  edit: ({ attributes, setAttributes, supports }) => {
    const { text } = attributes;
  //  const { supp } = supports;
    

    const onChange = (newText) => {
      setAttributes({ text: newText });
    };

    return (
      <div class="loop-container">
        <RichText
          tagName="h1"
          value={text}
          class="scroll-text"
          onChange={onChange}
          placeholder="Enter Heading Text"
        />
      </div>
    );
  },

  save: ({ attributes }) => {
    const { text } = attributes;

    return <div class="loop-container">
        <h1 class="scroll-text" placeholder="Enter Heading Text">{text}</h1>
      </div>;
  },
});



