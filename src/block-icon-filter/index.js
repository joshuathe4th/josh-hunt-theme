//const { registerBlockType } = wp.blocks;
import{ registerBlockType } from "@wordpress/blocks";
import{ PlainText, MediaUpload, InspectorControls, InspectorAdvancedControls, BlockControls } from "@wordpress/block-editor";
import{ PanelBody, RangeControl, ToolbarGroup, SelectControl} from "@wordpress/components";

import './style.scss';

const iconMap = {
  arrow: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30.847 18.773"><g fill="#2f2f2f" data-name="Group 381"><path d="m20.266 18.773-2-.044a11.134 11.134 0 0 1 1.678-5.194 10.19 10.19 0 0 1 3.818-3.567 11.365 11.365 0 0 1 1.259-.586 11.476 11.476 0 0 1-1.25-.582 10.21 10.21 0 0 1-3.818-3.562A11.131 11.131 0 0 1 18.267.051l2-.048-1 .024 1-.027a9.272 9.272 0 0 0 1.422 4.242 8.237 8.237 0 0 0 3.084 2.827 12.836 12.836 0 0 0 6.076 1.314v2a12.791 12.791 0 0 0-6.133 1.343 8.222 8.222 0 0 0-3.079 2.874 9.1 9.1 0 0 0-1.371 4.173Z" data-name="Path 240"/><path d="M27.222 10.375H0v-2h27.222Z" data-name="Line 37"/></g></svg>',
  circle: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 137 137"><g data-name="Group 382"><g data-name="Group 336"><path d="m38.487 82.922.091-4a34.073 34.073 0 0 1 15.906 5.152 31.225 31.225 0 0 1 10.926 11.7 36.83 36.83 0 0 1 2.9 7.043 36.836 36.836 0 0 1 2.885-7.016 31.27 31.27 0 0 1 10.91-11.7 34.09 34.09 0 0 1 15.877-5.179l.048 2 .052 2a25.019 25.019 0 0 0-4.42.664 31.024 31.024 0 0 0-9.572 3.988 27.329 27.329 0 0 0-9.437 10.231c-2.886 5.374-4.349 12.077-4.349 19.924h-4c0-7.861-1.465-14.573-4.355-19.95a27.284 27.284 0 0 0-9.45-10.227 30.8 30.8 0 0 0-9.585-3.973 25.025 25.025 0 0 0-4.427-.657Z" data-name="Path 240"/><path d="M66.33 106.206v-86.5h4v86.5Z" data-name="Line 37"/></g><path d="M68.5 4a64.18 64.18 0 0 0-36.06 11.013A64.7 64.7 0 0 0 9.067 43.395a64.41 64.41 0 0 0 5.946 61.165 64.7 64.7 0 0 0 28.382 23.373 64.41 64.41 0 0 0 61.165-5.946 64.7 64.7 0 0 0 23.373-28.382 64.41 64.41 0 0 0-5.946-61.165A64.7 64.7 0 0 0 93.605 9.067 64.093 64.093 0 0 0 68.5 4m0-4A68.5 68.5 0 1 1 0 68.5 68.5 68.5 0 0 1 68.5 0Z" data-name="Ellipse 200"/></g></svg>',
  mapMarker: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19 22.739"><path fill="#2f2f2f" d="M9.5 22.739a.846.846 0 0 1-.5-.159c-.368-.233-9-6.031-9-13.079a9.5 9.5 0 1 1 19 0c0 7.048-8.581 12.846-9 13.079a.846.846 0 0 1-.5.159ZM9.5 1.9a7.637 7.637 0 0 0-7.661 7.6c0 5.161 5.872 9.88 7.661 11.192 1.79-1.312 7.661-6.031 7.661-11.192A7.637 7.637 0 0 0 9.5 1.9Z" data-name="Path 244"/><path fill="#2f2f2f" d="M9.5 12.319a3.371 3.371 0 1 1 2.379-.992 3.371 3.371 0 0 1-2.379.992Zm0-4.9a1.532 1.532 0 1 0 1.083.449A1.533 1.533 0 0 0 9.5 7.416Z" data-name="Path 245"/></svg>',
  phone: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 20"><path fill="#2f2f2f" fill-rule="evenodd" d="M3 0a3 3 0 0 0-3 3v14a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V3a3 3 0 0 0-3-3ZM2 3a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1Zm3 12a1 1 0 0 0 0 2h4a1 1 0 0 0 0-2Z"/></svg>',
  email: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19.8 15.8"><g fill="#2f2f2f"><path d="M9.9 9.05a3.871 3.871 0 0 1-2.34-.78l-6.2-4.65a.9.9 0 0 1 1.08-1.44l6.2 4.65a2.111 2.111 0 0 0 2.52 0l6.2-4.65a.9.9 0 0 1 1.08 1.44l-6.2 4.65a3.871 3.871 0 0 1-2.34.78Z" data-name="Path 243"/><path d="M2.9 0h14a2.9 2.9 0 0 1 2.9 2.9v10a2.9 2.9 0 0 1-2.9 2.9h-14A2.9 2.9 0 0 1 0 12.9v-10A2.9 2.9 0 0 1 2.9 0Zm14 14a1.1 1.1 0 0 0 1.1-1.1v-10a1.1 1.1 0 0 0-1.1-1.1h-14a1.1 1.1 0 0 0-1.1 1.1v10A1.1 1.1 0 0 0 2.9 14Z" data-name="Rectangle 761"/></g></svg>',
  equalHousing: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21.534 18.638"><g fill="#2f2f2f" data-name="Group 361"><path d="M21.534 7.223v2.858h-1.4v8.557H20L8.327 18.62H1.572a1.285 1.285 0 0 1-.166-.022v-8.535H0V7.166l.828-.556 1.547-1.043C2.892 5.22 3.39 4.896 3.9 4.552s1.031-.7 1.547-1.04 1.011-.675 1.517-1.016 1-.669 1.494-1.006l2.17-1.451a.269.269 0 0 1 .283 0l.457.307c.363.246.726.494 1.09.738q1.052.712 2.106 1.412c.367.247.732.5 1.1.743l2.167 1.457q1.042.7 2.08 1.4c.487.328.978.652 1.465.98a1.4 1.4 0 0 1 .158.142Zm-3.719 8.473V7.773a.111.111 0 0 0-.062-.1l-1.761-1.177-3.551-2.377-1.634-1.093a.1.1 0 0 0-.125 0q-.306.213-.617.422l-1.458.975c-.463.31-.923.622-1.386.932l-1.4.938c-.661.446-1.321.891-1.984 1.33a.167.167 0 0 0-.085.16v7.913Z" data-name="Path 304"/><path d="M14.484 14.04h-7.42v-2.831h7.42Z" data-name="Path 305"/><path d="M14.477 10.394H7.044V7.435h7.4c.012.983.023 1.968.033 2.959Z" data-name="Path 306"/></g></svg>'
};

registerBlockType('my-gutenberg-block/icon-block', {
  title: 'Icon Block',
  icon: 'format-image',
  category: 'common',
  supports: {
    anchor: true,
    align: true,
    color: true,
    dimensions: {
        minHeight: true // Enable min height control.
    },
    typography: {
      fontSize: true,
  }
  },
  attributes: {
    imageID: {
      type: 'number',
      default: 0,
    },
    imageURL: {
      type: 'string',
      default: '',
    },
    text: {
      type: 'string',
      default: '',
    },
    iconWidth: {
      type: 'number',
      default: 20,
    },
    selectedIcon: {
      type: 'string',
      default: 'arrow', // Default icon
    },

  },
  edit: function ({ attributes, setAttributes }) {

    const { imageID, imageURL, text, iconWidth } = attributes;

  const icons = Object.keys(iconMap);


    const onSelectImage = (media) => {
      setAttributes({
        imageID: media.id,
        imageURL: media.url,
      });
    };

    return (
        
        <div className="image-text-block">
         

            
         <div style={{ width : iconWidth }}  class="icon-wrapper" dangerouslySetInnerHTML={{ __html: yourIconSvgComponent(attributes.selectedIcon) }} />


        <PlainText
          value={text}
          onChange={(newText) => setAttributes({ text: newText })}
          placeholder="Enter your text here..."
        />

        <InspectorControls>
        <PanelBody title={'Icon Settings'} initialOpen={true}>
          <RangeControl
              label='Icon Width'
              value={ iconWidth }
              min={0}
              max={500}
              onChange={(newWidth) => {
                  setAttributes({ iconWidth: newWidth });

              }}
          />

        <SelectControl
                    value={attributes.selectedIcon}
                    options={icons.map(icon => ({ label: icon, value: icon }))}
                    onChange={selected => setAttributes({ selectedIcon: selected })}
                />


        </PanelBody>

        </InspectorControls>
     

        <BlockControls>
                    <ToolbarGroup>
                    <MediaUpload
          onSelect={onSelectImage}
          value={imageID}
          render={({ open }) => (
            <button 
            class="components-button components-dropdown-menu__toggle has-icon"
            onClick={open}>
              {imageID ? 'Change Image' : 'Select Image'}
            </button>
          )}
        />

                      </ToolbarGroup>
        </BlockControls>
    </div>



    );
  },
  save: function ({ attributes }) {
    const { imageID, imageURL, text, iconWidth } = attributes;
    

    return (
      <div className="image-text-block">
                 <div style={{ width : iconWidth }}  class="icon-wrapper" dangerouslySetInnerHTML={{ __html: yourIconSvgComponent(attributes.selectedIcon) }} />
        <p>{text}</p>
      </div>
    );
  },
});



// Define a function to render SVG based on the selected icon
function yourIconSvgComponent(iconName) {
  // Get the SVG path based on the selected icon
  const svgPath = iconMap[iconName];

  console.log(iconMap[iconName])

  return svgPath;

  // Fetch the SVG file content from the path (you might want to use a proper API to fetch)
  // For simplicity, assuming you're using fetch or a similar method
 /* fetch(svgPath)
      .then(response => response.text())
      .then(svgContent => {
          // Return the fetched SVG content as a string
          return svgContent;
      });*/
}