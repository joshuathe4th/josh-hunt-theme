import { PluginDocumentSettingPanel } from '@wordpress/edit-post';
import { compose } from '@wordpress/compose';

import { withSelect, withDispatch, useSelect } from '@wordpress/data';

import { ColorPalette } from '@wordpress/components';

import {useEntityProp} from '@wordpress/coreData'

const PageColor = ( { postType, postMeta, setPostMeta } ) => {


const colors = useSelect('core/block-editor').getSettings().colors;

const [meta, setMeta] = useEntityProp('postType', postType, 'meta');


 return (
 <PluginDocumentSettingPanel name="ColorField" title="Custom Color" initialOpen="true">
      <ColorPalette
              colors={ colors }
              value={ postMeta._custom_color}
              onChange={ ( value ) => setPostMeta( { _custom_color: value } ) }
  
          />
      </PluginDocumentSettingPanel>
        )
}

export default compose( [
    withSelect( ( select ) => {
        return {
            postMeta: select( 'core/editor' ).getEditedPostAttribute( 'meta' ),
            postType: select( 'core/editor' ).getCurrentPostType(),
        };
    } ),
    withDispatch( ( dispatch ) => {
        return {
            setPostMeta( newMeta ) {
                dispatch( 'core/editor' ).editPost( { meta: newMeta } );
            }
        };
    } )
] )( PageColor );


