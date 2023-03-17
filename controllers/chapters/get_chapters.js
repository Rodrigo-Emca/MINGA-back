import Chapter from '../../models/Chapter.js'

const controller = {
    get_chapters: async (req, res, next) => {
        let query = {}

        let pagination = {page: 1, limit: 4 }

        if (req.query.page) {pagination.page = req.query.page}
        if (req.query.quantity) {pagination.limit = req.query.quantity}

        if (req.query.manga_id) { query.manga_id = req.query.manga_id }
        try {
        let page = await Chapter.find(query)
            .sort({ order: 1})

            .skip( pagination.page > 0 ? (pagination.page-1)*pagination.limit : 0 )
            .limit( pagination.limit > 0 ? pagination.limit : 0 )

            function obtenerDatosImportantes(arr) {
                const datosImportantes = [];
                
                arr.forEach(obj => {
                    const { _id, order, title, cover_photo, pages } = obj;
                    datosImportantes.push({ _id, order, title, cover_photo, pages });
                });
                return datosImportantes;
                }
                const datosImportantes = obtenerDatosImportantes(page);
        return res
        .status(200)
        .json({ chapters: datosImportantes
        })
        }
        catch(err) {
        next(err)
        }
    }
}

export default controller