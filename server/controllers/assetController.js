import Asset from '../models/Asset.js';

export const getAssets = async (req, res) => {
  try {
    const { category, search, sort, featured, trending, software } = req.query;
    
    let query = {};

    if (category) {
      query.category = category;
    }

    if (featured === 'true') {
      query.featured = true;
    }

    if (trending === 'true') {
      query.trending = true;
    }

    if (software) {
      query.software = software;
    }

    if (search) {
      query.$text = { $search: search };
    }

    let sortOption = {};
    if (sort === 'price-low') {
      sortOption = { price: 1 };
    } else if (sort === 'price-high') {
      sortOption = { price: -1 };
    } else if (sort === 'downloads') {
      sortOption = { downloads: -1 };
    } else if (sort === 'rating') {
      sortOption = { rating: -1 };
    } else {
      sortOption = { createdAt: -1 };
    }

    const assets = await Asset.find(query)
      .populate('createdBy', 'name avatar')
      .sort(sortOption);

    res.json({
      success: true,
      count: assets.length,
      data: assets
    });
  } catch (error) {
    console.error('Get assets error:', error);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

export const getAsset = async (req, res) => {
  try {
    const asset = await Asset.findById(req.params.id)
      .populate('createdBy', 'name avatar email');

    if (!asset) {
      return res.status(404).json({ success: false, message: 'Asset not found' });
    }

    res.json({
      success: true,
      data: asset
    });
  } catch (error) {
    console.error('Get asset error:', error);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

export const createAsset = async (req, res) => {
  try {
    const assetData = {
      ...req.body,
      createdBy: req.user._id
    };

    const asset = await Asset.create(assetData);

    res.status(201).json({
      success: true,
      data: asset
    });
  } catch (error) {
    console.error('Create asset error:', error);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

export const updateAsset = async (req, res) => {
  try {
    let asset = await Asset.findById(req.params.id);

    if (!asset) {
      return res.status(404).json({ success: false, message: 'Asset not found' });
    }

    if (asset.createdBy.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized to update this asset' });
    }

    asset = await Asset.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.json({
      success: true,
      data: asset
    });
  } catch (error) {
    console.error('Update asset error:', error);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

export const deleteAsset = async (req, res) => {
  try {
    const asset = await Asset.findById(req.params.id);

    if (!asset) {
      return res.status(404).json({ success: false, message: 'Asset not found' });
    }

    if (asset.createdBy.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized to delete this asset' });
    }

    await asset.deleteOne();

    res.json({
      success: true,
      message: 'Asset deleted successfully'
    });
  } catch (error) {
    console.error('Delete asset error:', error);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

export const incrementDownloads = async (req, res) => {
  try {
    const asset = await Asset.findByIdAndUpdate(
      req.params.id,
      { $inc: { downloads: 1 } },
      { new: true }
    );

    if (!asset) {
      return res.status(404).json({ success: false, message: 'Asset not found' });
    }

    res.json({
      success: true,
      data: asset
    });
  } catch (error) {
    console.error('Increment downloads error:', error);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};
